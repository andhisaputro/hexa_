const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProgramSchema = new schema({
    name:{
            type:String,
            required:true
        } 
});

module.exports = Program = mongoose.model("program",ProgramSchema);