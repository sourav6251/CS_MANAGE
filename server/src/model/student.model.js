import {model , Schema} from 'mongoose'



const studentSchema = new Schema({

    user : {
        type : Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    department :  {
        type : Schema.Types.ObjectId,
        ref : 'department',
        required : true
    },
    semester : {
        type: Number,
        enum: [1,2,3,4,5,6,7,8],
        required: true,
    },
    collageJoinDate:{
        type:Date
    }
},{timestamps : true})

export const Students = model('student',studentSchema)
