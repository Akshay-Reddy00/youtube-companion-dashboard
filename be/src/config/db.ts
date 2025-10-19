import mongoose from "mongoose";
import 'dotenv/config';


export async function dbConnect() {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('***** Connected to DB *****');
    } catch(e){
        console.error('Error connecting to DB', e);
    }
}

dbConnect();