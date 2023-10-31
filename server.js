const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/Product');

const app = express();


app.use(bodyParser.json());


mongoose.connect('mongodb+srv://krooprai:Koro17800@kabirrrrr.uacy9dc.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Welcome to DressStore Application');
});

app.get('/api/product', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ error: err }));
});

app.post('/api/product', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    });

    newProduct.save()
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ error: err }));
});

app.get('/api/product/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ error: err }));
});

app.put('/api/product/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ error: err }));
});


app.delete('/api/product/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ error: err }));
});

app.delete('/api/product', (req, res) => {
    Product.deleteMany({})
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ error: err }));
});

app.get('/api/product', (req, res) => {
    const query = req.query.q;
    const regex = new RegExp(query, 'i');
    Product.find({ name: regex })
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ error: err }));
});





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

