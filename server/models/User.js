import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required:true},
},{timestamps:true})

UserSchema.methods.comparePassword=function (){
    return bcrypt.compareSync(password, this.password)
}  //Adding function(method) to UserSchema

const User = mongoose.model("User", UserSchema)

export default User;
