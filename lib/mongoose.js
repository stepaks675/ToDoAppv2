import mongoose from "mongoose";
const MONGODB_URI = process.env.DB_KEY
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
    id : {type: Number, required: true},
    desc: {type: String, required: true},
    deadline: {type: Number, required: true},
    isExpired: {type:Boolean, default:false},
    isCompleted: {type: Boolean, default:false},
   
})

const Task = mongoose.models.Task || new mongoose.model("Task",TaskSchema)

export { Task, dbConnect }