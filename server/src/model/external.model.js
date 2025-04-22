import { model,Schema } from 'mongoose'


const externalSchema =new Schema({
    user : {

        type : Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : 'department',
        required : true

    },
    semester : {

        type : Schema.Types.ObjectId,
        ref : 'semester',
        required : true
    },
    paperCode : {
        type : String ,
                required : [true ,'paper code is required !!'],
                maxLength : [10,'paper code should be in 10 letter'],
                minLength : [3,'paper code must be in 3 letter'],
                trim : true

    },
    paperName : {
        type : String,
        required : [true ,'paper name is required!!'],
        maxLength : [10,'paper name should be in 10 letter'],
        minLength : [3,'paper name must be in 3 letter'],
        trim  : true
                

    },
    doe : {

    }

})



export const Externals = model('external',externalSchema)