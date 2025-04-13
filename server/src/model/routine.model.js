import { model , Schema } from "mongoose"
import { Departments } from "./department.model.js"

const routineSchema = new Schema({

    // routins - 
    //    - user
    //    - deparmanta
    //    - sem
    //    - schedules : [
    //        day :{ 
    //          name : string
    //         timeSlots : [
    //             {
    //                 paperCode : string
    //                 prof : user
    //                 StartingTime : date 
    //                 Endingtime : date 
    //             }
    //          ]
    //        }
    //    ]

 
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user',
        required : true ,
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : 'department',
        required : true ,
    },
    semester : {
        type : Schema.Types.ObjectId,
        ref : 'semester',
        required : true ,
    },
    roomNo:{
        type :String
    },
    schedules : [
        {
            dayName : {
                type : String,
                required : [true , 'days are required !'],
                maxLength : [15 , 'day name should be in 15 letter'],
                minLength : [ 3 , 'day name must be in 3 letter '],
                trim : true ,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            timeSlots : [
                { 
                    paperCode : {
                    type : String ,
                    required : [true,'paperCode is required !!'],
                    maxLength : [10,'paperCode should be in 10 letter'],
                    minLength : [3,'paperCode  must be in 3 letter'],
                    trim : true
    
                    } ,
                    professor : {
                    type : Schema.Types.ObjectId,
                    ref : 'user',
                    required : true,
                    },
                    startTime : {
                    type : String,
                    required : true 
                    },
                    endTime : {
                    type : String ,
                    required : true
                    }

                }
            ]
        }
        
    ]


} , { timestamps : true })






export const Routines = model( 'routine' , routineSchema)