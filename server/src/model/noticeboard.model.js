import {model,Schema } from 'mongoose'

const noticeboardSchema =new Schema({

    title : {
        type : String,
        required : [true,'title  is required'],
        trim : true,
        maxLength : [60,'title should be in 60 letter'],
        minLength : [3,'title must be in 3 letter']
    },
    description : {
        type : String,
        trim : true,
        maxLength : [500,'description must be in 500 letter']
    },
    media : [
        {
            url : {
                type : String ,
                default : 'https://img.freepik.com/premium-vector/user-circle-with-blue-gradient-circle_78370-4727.jpg?w=826'
            },
            id : {
                type : String ,
                // enum : ['image' , 'pdf'],
                // required : true
            }
        }
    ],

    user : {
        type : Schema.Types.ObjectId,
        ref : 'user', 
        required : true

    },
    department : {

        type : Schema.Types.ObjectId,
        ref : 'department',
        required : true
    }
} ,{ timestamps : true }) 




export const Noticeboard = model('noticeboard',noticeboardSchema)