const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema(
  {
    adharCard: {
      type: String,
    },
    panCard: {
      type: String,
    }
  },
  {timestamps:true}
)

module.exports=mongoose.model('Docs',docsSchema);