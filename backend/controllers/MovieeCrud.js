const Moviee = require("../models/Movielist")

exports.createUser = async (req,res)=>{
    try{
        var moviees = await Moviee.create(req.body)
        res.send({moviees})
    }catch(error){
        res.json({error})
    }
 }
 exports.findAllmoviees = async(req,res)=>{
    try{
       var moviees = await Moviee.findById(req.params.id);
       res.send({moviees}) 
    }catch(error){
        res.status(404).json({"Message": "Extracting Failed!"})
    }
 }

 exports.deletemoviees = async (req, res)=>{
     try{
       const moviees =  await Moviee.findById(req.params.id)
       await moviees.remove()
       res.send({data: "Deletion Successful"+moviees.id})
    } catch {
        res.status(404).send({error: "Form not found"})
    }
    }

exports.updatemoviees = async(req,res)=>{
    try{
        var {id:movieeID} = req.params;
        var moviees = await Moviee.findByIdAndUpdate({_id:movieeID},req.body,{
            new:true, runValidators:true
        }); 
        if(!moviees){
           return  res.status(404).json({msg:"moviee Not found!"})
        }
        res.status(200).send(moviees)
       }catch(error){
        res.status(404).json({msg:error}) 
       }
}