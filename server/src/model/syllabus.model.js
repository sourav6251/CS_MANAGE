import { model, Schema } from "mongoose";


const media=new Schema({
    mediaUrl: {
        type: String,
        required: [true, "media url is required !"],
        maxLength: [100, "media url should be in 100 letter"],
        minLength: [3, "media url must be in 3 letter "],
        trim: true,
    },
    mediaID: {
        type: String,
        required: [true, "media id is required !"],
        maxLength: [100, "media id should be in 100 letter"],
        minLength: [3, "media id must be in 3 letter "],
        trim: true,
    },
},{ timestamps: true });
const syllabusSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "department",
        required: true,
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: "semester",
        required: true,
    },
    paperCode: {
        type: String,
        required: [true, "paper code is required !"],
        maxLength: [10, "paper code should be in 10 letter"],
        minLength: [3, "paper code must be in 3 letter "],
        trim: true,
    },
    media: [media],
}, { timestamps: true });



export const Syllabus = model("syllabus", syllabusSchema);