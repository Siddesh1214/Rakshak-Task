import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="flex justify-center mt-80 items-center gap-16 ">
			<Link to="/login">
				<button className="px-6 py-3 bg-slate-300 text-black rounded">
					Login
				</button>
			</Link>
			<Link to="/signup">
				<button className="px-6 py-3 bg-slate-300 text-black rounded">
					Signup
				</button>
			</Link>
		</div>
	);
}

export default Home;
