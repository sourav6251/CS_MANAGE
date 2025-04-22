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
        type :  Schema.Types.ObjectId,
        ref : 'semester',
        required : true,
    }
},{timestamps : true})

export const Students = model('student',studentSchema)
