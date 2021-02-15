var express=require('express');
var router=express.Router();//server
let mongo=require('../mongo/mongodb');

//server  (express router - get,put,post,delete methods which will give request and response)
router.post('/',function(req,res){
     console.log('create');
      mongo.createUser(req.body).then((data)=>{  //.then(()=>{})
                if(data==='inserted'){
                     res.send({code:200,message:"User Created Sucessfully"});
                }
                else if(data==='record already exists'){
                     res.send({code:409,message:'User  already exist with this user name.'});
                 }
                 else{
                     res.send('something went wrong');
                 }
    
            }).catch((err)=>{
                res.send(err);
            })   

});

module.exports=router;