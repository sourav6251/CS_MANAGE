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
        type : String,
        required : [true,'semester name is required'],
        maxlength : [15,'semester name should be in 15 letter'],
        minLength : [3,'semester name must be in 3 letter'],
        trim : true
    },
    collageJoinDate:{
        type:Date
    }
},{timestamps : true})

export const Students = model('student',studentSchema)
