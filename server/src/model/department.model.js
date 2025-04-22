import { model, Schema } from "mongoose";

const departmentSchema = new Schema({

    // deperments -(Super-admin)
    //   - _id (auto Genarate)
    //   - name  - string 
    //   - capacity - number
    //   - totalFaculty - number
    //   - email 

    name:{
        type : String,
        required : [ true, 'department name is required !!' ],
        maxLength : [ 60, 'department name should be in 60 letter' ],
        minLength : [ 3, 'department name must be in 3 letter' ], 
        trim : true,
        unique: true,

    },
    capacity:{
        type : Number,
        // required :true
    },
    totalFaculty : {
        type : Number,
        // required : true,

    },
    email : {
        type : String,
        required : [ true, 'email is requiresd !' ],
        unique : true,
        trim : true
    },
    

} , { timestamps : true} )

export const Departments = model( 'department' , departmentSchema)