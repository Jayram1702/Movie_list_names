const mongoose = require("mongoose")

const movieeSchema = new mongoose.Schema({
    name:{
        type:String
    },
    date:{
        type:String
    },
    genre:{
        type:String
        
    },
    
})

const Moviee = mongoose.model("Moviee", movieeSchema)
module.exports = Moviee;