const express=require('express');

const app=express();
let port = process.env.port||3000;

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('lending');
});

app.get('campgrouns',(req,res)=>{
    
});

app.listen(port,()=>{
    console.log('Yelp Camp is listening on port:'+port)
})