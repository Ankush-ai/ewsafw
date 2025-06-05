const mongoose = require("mongoose");
const chapterScehma = new mongoose.Schema({
    subject: String,
    chapter: String,
    class: String,
    unit: String,
    yearWiseQuestionCount: Object,
    questionSolved: Number,
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        default: "Not Started",
    },
    isWeakChapter: Boolean,
});

module.exports=mongoose.model("Chapter" , chapterScehma);