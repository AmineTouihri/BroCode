const mongosse=require("mongoose");
const UniqueValidator=require("mongoose-unique-validator");
const userSchema=mongosse.Schema({
    email:{type:String ,require:true,unique:true},
    password:{type:String,require:true},
    name:{type:String,require:true},
    Status:{type:String,require:false},
    verified:Boolean
})
userSchema.plugin(UniqueValidator);
module.exports=mongosse.model("User",userSchema);