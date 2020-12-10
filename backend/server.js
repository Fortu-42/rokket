const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Fruit = require('./models/fruit');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const fruits = await Fruit.find();
        res.send(fruits);
        res.end();
        return
    } catch (err) {
        throw err;
    }
});

app.post('/fruit', async (req, res) => {
    try{
    const fruit = new Fruit({
        name: req.body.name,
        color: req.body.color,
        size: req.body.size
    });
    const result = await fruit.save();
    res.send({ ...result._doc, _id: result.id });
    res.end();
    }catch(err){
        throw err;
    }
});

app.delete('/fruit/:id', async(req, res)=>{
    try{
        const result = await Fruit.findByIdAndDelete(req.params.id);
        res.send({ ...result._doc, _id: result.id });
        res.end();
    }catch(err){
        throw err;
    }
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kdj8u.mongodb.net/Cluster0?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => {
        console.log('connected to database');
        app.listen(8000, () => {
            console.log('app started');
        });
    })
    .catch((err) => console.log(err));



