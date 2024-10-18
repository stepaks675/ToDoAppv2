import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://stepaks:Tankionlain007@maclaste.xb9z2.mongodb.net/?retryWrites=true&w=majority&appName=maclaste"
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const TaskSchema = new mongoose.Schema({
    id : {type: Number , required: true},
    desc: {type: String, required: true},
    isExpired: {type:Boolean, required:true},
    isCompleted: {type: Boolean, required: true},
    deadline: {type: Number}
})

const Task = new mongoose.model("Task",TaskSchema)

export { Task, dbConnect }