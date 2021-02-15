var express=require('express');
var router=express.Router();//server
let mongo=require('../mongo/mongodb');

router.get('/',function(req,res){
    console.log('start');
    mongo.find({name:req.body.name}).then((data)=>{
        res.send({code:200,message:'Success',data:data});
    }).catch(err=>{
        res.send(err);
    })
});

module.exports=router;