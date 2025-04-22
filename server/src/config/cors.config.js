import cors from "cors"


 const corsConfig = cors(
    {
      origin : `*` , 
      methods : ["GET" , "POST" , "PUT" , "PATCH" , "DELETE"] , 
      credentials: true
    }
 )


 export default corsConfig ; 