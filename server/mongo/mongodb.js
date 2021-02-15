const { rejects } = require('assert');
var mongodb=require('mongodb');
const path = require('path');
const { abort } = require('process');
var url="mongodb://localhost:27017/";
var MongoClient=mongodb.MongoClient;

let mongoconnect={                                     //all functions in one variable   (mongoclient)
    find(query={}){
        return new Promise((resolve , reject) =>  { //promise returns two values reject(),resolve()
                try {
                     MongoClient.connect(url,{ useUnifiedTopology: true },function(err,db){ //// return value for err and data
                         if (err) throw err;  //if db not connected
                    
                             let dbo=db.db("mydb");
                             dbo.collection("users").find(query).toArray(function(err,result){
                                if(err) reject(err);  //data not exists
                                else{
                                    resolve(result);  //data exists
                                }
                                db.close();
                            
                             });
                     });

                }
                catch(e){
                    console.log(e);
                      
                   }
    });

},

createUser(params){
        return new Promise(function(resolve,reject){
             
                 MongoClient.connect(url,{useUnifiedTopology:true},function(err,data){
                     if (err) reject(err);  //db not connected
            
                             let dbo=db.db("mydb"); 
                             let myobj=params;     //userName--db col name
                              mongoconnect.find({userName:myobj.userName}).then((data)=>{
                                 if(!data.length||!data){
                                         dbo.collection('users').insert0ne(myobj,(err,data)=>{
                                         if (err) reject(err);
                                        else{
                                            resolve("inserted");
                                            db.close();
                                        }
                                        
                                 });
                                }
                        
                                else{
                                    resolve("record already exists");
                                }
                              
                            }).catch((e)=>{
                                 reject(err);
                           });
                        
                        });
         
        }); 
    },

updateUser(data){
       return new Promise((resolve,reject)=>{
                MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        if(err) throw reject(err);
                    
                        let dbo=db.db('mydb');
                        let old_query={userName:data.userName};
                        let new_query={$set:data};
                        dbo.collection('users').updateOne(old_query,new_query,function(err,result){
                                  if(err) throw err;
                                  else{
                                      resolve('updated');
                                      db.close();
                                  }
                        });
                 });
                
            });         
},

deleteUser(data){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                if(err) throw reject(err);
            
                let dbo=db.db('mydb');
                var myquery={userName:data.userName};
                dbo.collection('users').deleteOne(data,function(err,result){
                          if(err) throw err;
                          else{
                              resolve('deleted');
                              db.close();
                          }
                });
         });
        
    });     
     

}
}

module.exports=mongoconnect;