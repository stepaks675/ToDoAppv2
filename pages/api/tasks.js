import { dbConnect, Task } from "../../service/lib/mongoose";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method == "GET") {
    try {
      const tasks = await Task.find({});
      res.status(200).send(tasks)
    } catch {
      res.status(404).send();
    }
  }
  if (req.method == "POST") {
    try {
      console.log(req.body)
      const newTask = new Task(req.body);
      await newTask.save();
      res.status(200).send();
    } catch {
      res.status(404).send();
    }
  }
}
