import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connecDB = async ()=>{
  try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)   
      console.log(connectionInstance.connection.host)
      console.log("⚙️",  "Db connected")
  } catch (error) {
    console.log(`failed to connect with data base ${error}`)
    process.exit(1)
  }
};

export default connecDB;