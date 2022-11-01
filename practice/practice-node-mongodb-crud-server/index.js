const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5001;
const cors = require('cors');

//* middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('practice node mongo crud is running!')
})


const uri = "mongodb+srv://dbUser3:zd4r1fU5zVhZWt1x@cluster0.drjbcpx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const userCollection = client.db("practiceNodeMongoCrud").collection("users");

    app.get('/users', async (req, res) => {
        const query = {};
        const cursor = userCollection.find(query);
        const users = await cursor.toArray();
        res.send(users)
    })

    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const user = await userCollection.findOne(query)
        res.send(user);
    })

    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        console.log(result);
        res.send(result)
    })

    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateUser = {
            $set: {
                name: user.name,
                address: user.address,
                email: user.email
            }
        };
        const result = await userCollection.updateOne(filter, updateUser, options);
        res.send(result);
        console.log(result)
    })

    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const result = await userCollection.deleteOne(query);
        res.send(result);
    })

}
run().catch(err => console.log(err));


app.listen(port, () => {
    console.log(`port ${port} is running!`)
})