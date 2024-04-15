var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public_html'));

const uri = "mongodb+srv://farid:farid1234@cluster0.iiqckff.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri);
let db;

async function connectDatabase() {
  let conn;
  try {
    conn = await client.connect();
    console.log("Connected to MongoDB successfully")
  } catch (e) {
    console.error(e);
    console.log("Faild to MongoDB")
  }
  return conn.db("sit725");
}

app.use(express.json()); 
app.use(express.urlencoded({
    extended: false
}));


  app.get('/api/users',async (req,res) => {
    const collection = await db.collection('users');
    const data = await collection.find({}).toArray();
    res.json({ statusCode: 200, data, message: "Success" })  })

  app.post('/api/users',async (req,res) => {
    console.log(req.body);
    await db.collection('users').insertOne(req.body);
    res.json({statusCode: 200, message:"Success"})
    })

app.listen(3000, async function(){
    console.log("Web server running at: http://localhost:3000/addTwoNumbers");
    console.log("Type Ctrl+C to shut down the web server");
    db = await connectDatabase();
});