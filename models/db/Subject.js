const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SubjectSchema = new schema({
    name:{
            type:String,
            required:true
        } ,
    credit:{
        type:Number,
        required:true
    }
});

module.exports = Subject = mongoose.model("subject",SubjectSchema);