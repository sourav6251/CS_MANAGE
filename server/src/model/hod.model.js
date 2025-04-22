import {model,Schema } from 'mongoose'

const hodSchema =new Schema({

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




export const Hods = model('hod',hodSchema)