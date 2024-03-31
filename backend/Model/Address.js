const mongoose=require('mongoose')
const address=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
   address :{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model('address',address)