import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
// import { setAttemptedTrue } from "../../../server/controllers/Quiz";
import { getQuiz, markTestGiven } from "../services/authAPIs";
import {
	setTestAttempted,
	setMarks,
	setUser,
} from "../redux/slices/profileSlice";
import { Link } from "react-router-dom";

function Quiz() {
	const { token, user } = useSelector((state) => state.profile);
	// console.log(token);
	// console.log(user);
	const dispatch = useDispatch();

	const [quizData, setQuizData] = useState({});
	const [currQuestion, setCurrQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [clickedOption, setClickedOption] = useState(0);
	const [showResult, setShowResult] = useState(false);

	useEffect(() => {
		const getAll = async () => {
			// const response;
			const ans = await getQuiz();
			// console.log("ANS is", ans);

			setQuizData(ans);
		}
		getAll();
	}, [token]);

	useEffect(() => {
	}, [quizData]);


	const changeQuestion = async () => {
		updateScore();
		if (currQuestion < quizData.length - 1) {
			setCurrQuestion(currQuestion + 1);
			setClickedOption(0);
		} else {
			setShowResult(true);

			

			const res = await markTestGiven(token, user, score);
			console.log("FROM QUIZ PAGE", res.data.sol);
			
			await dispatch(setUser(res.data.sol));
			localStorage.setItem("user", JSON.stringify(res.data.sol));

			await dispatch(setTestAttempted(true));
			localStorage.setItem("testAttempted", true);
			localStorage.setItem("marks", score);

			toast.success("You completed the test");
		}
	};

	const updateScore = () => {
		if (clickedOption === quizData[currQuestion].answer) {
			setScore(score + 1);
		}
	};

	console.log("CLICKED OPTION", clickedOption);

	const showMarks = user.marks;
	// console.log("showMarks",showMarks)

	return (
		<div className="max-w-[1300px] mx-auto">
			<h2 className="text-center text-5xl font-bold py-6">Exam Section</h2>

			{user?.attempted === true ? (
				<div className="font-bold text-5xl text-center text-red-500">
					<div>You already attempted the test</div>
					<span className=" text-3xl text-center text-red-500">
						Your marks {user?.marks ? user?.marks : score} out of{" "}
						{quizData.length}
						<br />
					</span>
					<span className=" text-2xl text-center text-green-500">
						You will get liscence after uploading your Adhar Card and Pan Card
						in the Upload Docs Tab
						<br />
					</span>
					<Link to="/uploadDocs">
						{" "}
						<span className="text-xl underline text-blue-400 hover:text-blue-800">
							Upload Docs
						</span>
					</Link>
				</div>
			) : (
				<>
					<div className="flex items-center flex-col text-xl ">
						<span className="font-bold">Instructions</span>
						<span>Only one attempt for the quiz.</span>
						<span>You can not give the exam again.</span>
						<span>You can not go to previous question.</span>
						<span>Do not do cheating.</span>
					</div>
					<div className="w-[60%] mx-auto border border-pink-600 px-16 py-8">
						{showResult ? (
							<div className="flex flex-col items-center">
								<span>Total Marks === {quizData.length}</span>
								<span>Your Marks === {score}</span>
							</div>
						) : (
							<div className="flex flex-col ">
								<div className="flex items-center border py-5  gap-20 pl-10">
									<span> #{currQuestion + 1}</span>
									<span>{quizData[currQuestion]?.question}</span>
								</div>
								<div className=" flex flex-col items-start py-4 gap-y-8 ">
									{quizData[currQuestion]?.options?.map((elem, i) => (
										<button
											key={i}
											className={`p-1 border-none outline-none bg-slate-200 rounded-md w-full hover:bg-yellow-400 ${
												clickedOption === i + 1
													? " bg-yellow-400"
													: "bg-slate-200"
											} `}
											onClick={() => setClickedOption(i + 1)}
										>
											{elem}
										</button>
									))}
								</div>
								<span>Clicked Option :{clickedOption}</span>
								<input
									type="button"
									value="Next"
									id="next-button"
									className="mx-auto px-6 py-1 mt-5 text-xl bg-blue-300 cursor-pointer"
									onClick={changeQuestion}
								/>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Quiz;
