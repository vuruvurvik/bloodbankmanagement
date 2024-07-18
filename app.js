const express=require('express');
const ejsMate=require('ejs-mate');
const path=require('path');
const methodOverride=require('method-override');
const mongoose=require('mongoose');
const donorRoutes=require('./routes/donor');
const donor = require('./models/donor');
const app=express();

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true})); 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://127.0.0.1:27017/donate-app');

const db=mongoose.connection;
db.on("error",console.error.bind(console,"console error"));
db.once("open",()=>{
    console.log('Database connected');
});

app.use('/donors',donorRoutes);

app.get('/',(req,res)=>{
    res.render('home');
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


app.listen(3000,(req,res)=>{
    console.log('Server running at port 3000');
})