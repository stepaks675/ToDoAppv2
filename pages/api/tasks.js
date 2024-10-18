import { dbConnect, Task } from "../../lib/mongoose";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method == "GET") {
    try {
      const tasks = await Task.find({});
      res.status(200).json(tasks);
    } catch {
      res.status(404).send();
    }
  }
  if (req.method == "POST") {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(200);
    } catch {
      res.status(404).send();
    }
  }
}
