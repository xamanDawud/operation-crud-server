const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

// username and password
//operation_crud
//TtuPbZg27wf9sE5E

const uri =
  "mongodb+srv://operation_crud:TtuPbZg27wf9sE5E@cluster0.lgiglma.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("operation_crud").collection("users");

    app.get("/users", async (req, res) => {
      let cursor = database.find();
      let result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      let id = req.params.id;
      let query = { _id: new ObjectId(id) };
      let result = await database.findOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      let user = req.body;
      let result = await database.insertOne(user);
      res.send(result);
    });

    app.put("/users/:id", async (req, res) => {
      let id = req.params.id;
      let user = req.body;
      let cursor = { _id: new ObjectId(id) };
      let option = { upsert: true };

      let userDoc = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      let result = await database.updateOne(cursor, userDoc, option);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      let id = req.params.id;
      // let query = { _id: new ObjectId(id) };
      // let result = await database.deleteOne(query);
      // res.send(result);
      console.log(id);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Data is coming sooooon");
});

app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
