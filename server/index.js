const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 8080;
require('dotenv').config()
app.use(express.json());
const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});



const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PATCH',
      'UPDATE',
      'DELETE',
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
        const find = await collectionCart().findOne({"product._id": item.product._id})
        if(find == null){
            const result = await collectionCart().insertOne(item)
            res.send(result)
        }else{
            const result = await collectionCart().updateOne({"_id": find._id}, {"$set": {"quantity": find.quantity+1}})
            res.send(result)
        }
        
    }finally{}
}

async function listCartItems(res) {
    try{
        const result = await collectionCart().find({})
        const items = await result.toArray()
        res.send(items)
    }finally{}
}

async function removeCartItem(item, res) {
    const find = await collectionCart().findOne({"product._id": item.product._id})
        if(find.quantity == 1){
            const result = await collectionCart().deleteOne({"product._id": item.product._id})
            res.send(result)
        }else{
            const result = await collectionCart().updateOne({"_id": find._id}, {"$set": {"quantity": find.quantity-1}})
            res.send(result)
        }
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

app.delete('/remove_cart_item', (req, res)=>{
    const item = req.body
    removeCartItem(item, res)
})

app.get("/order/:total", (req, res) => {
    try {
      const options = {
        amount: parseInt(req.params.total) * 100, // amount == Rs 10
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 0,
   // 1 for automatic capture // 0 for manual capture
      };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
    return res.status(200).json(order);
   });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
   }
  });

  app.post("/capture/:paymentId/:total", (req, res) => {
    try {
      return request(
       {
       method: "POST",
       url: `https://rzp_test_nOlhUhKSlhrung:RnU0D3V34xcZoozZdJfHs79u@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
       form: {
          amount: parseInt(req.params.total) * 100, // amount == Rs 10 // Same As Order amount
          currency: "INR",
        },
      },
     async function (err, response, body) {
       if (err) {
        return res.status(500).json({
           message: "Something Went Wrong",
         }); 
       }
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        //add summary to the database
        return res.status(200).json(body);
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
     });
    }
  });
  

app.listen(port, ()=>{
    console.log(`app is listening at port: ${port}`);
});
