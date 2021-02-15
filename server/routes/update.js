var express=require('express');
var router=express.Router();//server
let mongo=require('../mongo/mongodb');

//server  (express router - get,put,post,delete methods which will give request and response)
router.post('/',function(req,res){
      mongo.updateUser(req.body).then((data)=>{  //.then(()=>{})
                if(data==='updated'){
                     res.send({code:200,message:"User Updated Sucessfully"});
                }
                 else{
                     res.send('something went wrong');
                 }
    
            }).catch((err)=>{
                res.send(err);
            })   

});

module.exports=router;
