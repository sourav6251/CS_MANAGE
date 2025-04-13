import mongoose from "mongoose";

export const dbConnection= async () => {
    
    try {
        const dbURI=process.env.DB_URI;
        await mongoose.connect(dbURI);
        console.log('Database connect successfully................');
        
    } catch (error) {
        console.log(`Error occour when try to conect witn DB\nError =>${error}`);
        
    }
} 