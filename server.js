require('dotenv').config()

const express = require ('express');
const app = express()
const mongoose = require('mongoose')



mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const db = mongoose.connection
db.on ('error', (error) => console.error(error) )
db.once('open', () =>  console.log('Connected to Database'))


app.use(express.json())
const productRouter = require('./routes/productroutes');
app.use('/productrouters', productRouter)


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DressStore application.' });
  });
  

app.listen(4444, () => console.log('Server Started'))