import { Task, dbConnect } from "../../../lib/mongoose";
export default async function handler(req,res){
    await dbConnect();
    const option = req.query.id;
    if (req.method == "DELETE"){
        try{
        await Task.deleteMany({id: option})
        res.status(200).send()
        } catch (err){
            console.log(err)
            res.status(404).send()
        }
    }
    if (req.method == "PUT"){
        try {
            const data = req.body
            console.log(data)
            switch(data.method){
                case "expired":
                    await Task.findOneAndUpdate({id: option}, {$set : {isExpired: true}})
                    break;
                case "completed":
                    const a = await Task.findOne({id:option});
                    const task = await Task.findOneAndUpdate({id: option}, {$set : {isCompleted: !a.isCompleted}}, {new: true})
                    break;
            }
            res.status(200).send()
        } catch (error) {
            console.log(error);
            res.status(404).send()
        }
    }

}