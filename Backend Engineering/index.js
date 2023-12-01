const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use(express.json({limit: '200mb'}));

const farmerRoute = require('./routes/farmer.route');
const cropRoute = require('./routes/crop.route');

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('MongoDB connected');
})
.catch((err)=>{ 
    console.error('Error Connecting To MongoDB', err);
})

app.use('/farmer', farmerRoute)
app.use('/crop', cropRoute)

app.get('/', (req, res)=>{
    res.status(200).json({
        name: 'Klusterthon Group 12',
        Backend: 'Backend',
        groupDetails:'Precision Farming for Best Product Result Using Data',
        members:[
        {name: 'EbunOluwa David-Suberu' , role: 'Team Lead|Front-end dev'},
        {name: 'Joshua Adegbite' , role: 'Fullstack dev'},
        {name: 'Victor Banjo' , role: 'Front-end dev'},
        {name: 'Glorious Olajire' , role: 'Front-end dev'},
        {name: 'Seyi Samuel' , role: 'Data Scientist'},
        ]
    })
})

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, ()=>{
    console.log('server started')
})

// https://hackathon-klusterthon-group-12.vercel.app/
