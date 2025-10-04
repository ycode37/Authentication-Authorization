import mongoose from "mongoose";

//To connect APP with MongoDB we use this

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `Database Connected ${connect.connection.host} , ${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export default dbConnect;
