import mongoose,{Schema, Types} from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const UserSchema = new Schema({
    username: {type: String,unique:true, required: true},
    password: {type: String, required: true}
});

const TagSchema = new Schema({
    title: {type: String, required: true,unique: true}
})

// const contentTypes = ['image','video','article','audio']     //extendible
const ContentSchema = new Schema({
    link: {type:String,required:true},
    type: {type:String },   //, enum:contentTypes
    title: {String},
    tags: [{type: Types.ObjectId, ref:'Tag'}],
    userId: {type:Types.ObjectId, ref:'User'}
})

const LinkSchema = new Schema({
    hash: {type:String, required:true, unique:true},
    userId:{type:Types.ObjectId,ref:'User', required: true}
})

export const UserModel = mongoose.model("User",UserSchema);
export const TagModel = mongoose.model("Tag",TagSchema);
export const ContentModel = mongoose.model("Content",ContentSchema);
export const LinkModel = mongoose.model("Link",ContentSchema);