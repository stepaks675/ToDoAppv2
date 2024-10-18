import { Task, dbConnect } from "../../../lib/mongoose";
export default async function handler(req,res){
    await dbConnect();
    const option = req.query.id;
    if (req.method == "PUT"){
    
    }
    if (req.method == "DELETE"){

    }

}