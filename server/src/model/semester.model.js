import { model, Schema } from "mongoose";

const semesterSchema = new Schema({

    // . sems
    // - name 
    // - deperment (deparmantalId)
    // - subjects :[
    //   {
    //       paperCode : -string
    //       paperName : -string
    //   }
    // ]
    
    name:{
        type : String,
        required : [true,'semester name is required !!'],
        maxLength : [15,'semester name should be in 15 letter'],
        minLength : [3,'semester name must be in 3 letter'],
        trim : true

    },
    department : {
        type : Schema.Types.ObjectId,
        ref : 'department' ,
        required : true 
    },
    subject : [
        {
            paperCode : {
                type : String ,
                require : [true,'paperCode is required !!'],
                maxLength : [10,'paperCode should be in 10 letter'],
                minLength : [3,'paperCode  must be in 3 letter'],
                trim : true

            } ,
            paperName : {
                type : String ,
                require : [true,'paperName is required !!'],
                maxLength : [10,'paperName should be in 10 letter'],
                minLength : [3,'paperName must be in 3 letter'],
                trim : true
            }
        } 
    ],

    } , { timestamps : true} )

export const Semesters = model( 'semester' , semesterSchema)