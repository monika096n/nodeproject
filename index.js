var  createError=require('http-errors');
var   express=require('express');
var app=express();
var cors=require('cors');
var path=require('path');
var bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
//app.use(express.static(path.join(__dirname,'public')));
var router=express.Router();//server
let mongo=require('./server/mongo/mongodb');
//let =require('./server/routes/create');
let finduserRoute=require('./server/routes/find');
let updateuserRoute=require('./server/routes/update');
let deleteuserRoute=require('./server/routes/delete');


//server  (express router - get,put,post,delete methods which will give request and response)
var arr=router.post('/createuser',function(req,res){
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

app.use('/createuser',arr);
app.use('/getuser',finduserRoute);
app.use('/updateuser',updateuserRoute);
app.use('/deleteuser',deleteuserRoute);



app.use(function(res,req,next){
     console.log("going to start server ?");
     next(createError(404));

} );

app.listen(5000,function(res,req){
     console.log('Server Started !!! ');
});