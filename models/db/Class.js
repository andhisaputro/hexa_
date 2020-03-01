const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Schema = new schema({
    name:{
            type:String,
            required:true
        } 
});

module.exports = Subject = mongoose.model("class",Schema);