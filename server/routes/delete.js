var express=require('express');
var router=express.Router();//server
let mongo=require('../mongo/mongodb');

router.get('/',function(req,res){
    mongo.deleteUser(req.body).then((data)=>{
        res.send({code:200,message:'Success',data:data});
    }).catch(err=>{
        res.send(err);
    })
});

module.exports=router;