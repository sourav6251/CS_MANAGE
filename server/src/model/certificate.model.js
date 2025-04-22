import { model, Schema } from "mongoose";
const certificateSchema = new Schema({
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
    paperName: {
        type: String,
        required: [true, "paper name is required !"],
        maxLength: [50, "paper name should be in 50 letter"],
        minLength: [3, "paper name must be in 3 letter "],
        trim: true,
    },
    studentsNo: {
        type: Number,
        required: [true, "studens no is required !"],
        min: [1, "studens no must be greater than 1"],
        max: [1000, "studens no must be less than 1000"],
    },
    dateOfExamination: {
        type: Date,
        required: [true, "date of examination is required !"],
    },
    designation: {
        type: String,
        required: [true, "designation is required !"],
        maxLength: [100, "designation should be in 100 letter"],
        minLength: [3, "designation must be in 3 letter "],
        trim: true,
    },
    status:{
        type:String,
        enum : ['reject' , 'pending','accept'],
        default: 'pending',
        required: true,
    }
}, { timestamps: true });

export const Certificate = model("certificate", certificateSchema);