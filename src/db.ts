import mongoose,{Schema} from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const UserSchema = new Schema({
    username: {type: String,unique:true, required: true},
    password: {type: String, required: true}
});



export const UserModel = mongoose.model("User",UserSchema);