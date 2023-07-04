const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 8080;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
app.use(express.json());

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PATCH',
      'UPDATE',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
};
  
app.use(cors(corsOpts));

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const user = encodeURIComponent(username);
const pass = encodeURIComponent(password);

const uri = `mongodb+srv://${user}:${pass}@cluster0.ckxff.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("shri-krishnagan")


function collectionProducts() {
    try{
        return database.collection("products");
    }finally{}
}

function collectionCart() {
    try{
        return database.collection("cart");
    }finally{}
}


//APIs

async function listProducts(res, skip, limit) {
    try{
        const cur = await collectionProducts().aggregate([{"$skip": skip}, {"$limit": limit}])
        const pdts = await cur.toArray()
        res.send(pdts)
    }finally{}
}

async function addToCart(item, res) {
    try{
        const result = await collectionCart().insertOne(item)
        res.send(result)
    }finally{}
}

async function listCartItems(res) {
    try{
        const result = await collectionCart().find({})
        const items = await result.toArray()
        res.send(items)
    }finally{}
}

//serving routess
app.get('/products', (req, res) => {
    const skip = parseInt(req.query.skip)
    const limit = parseInt(req.query.limit)
    listProducts(res, skip, limit)
})


app.post('/add_to_cart', (req, res) => {
    const item = req.body
    //console.log(item)
    addToCart(item, res)
})

app.get('/list_cart_items', (req, res) => {
    listCartItems(res)
})

app.listen(port, ()=>{
    console.log(`app is listening at port: ${port}`);
});
