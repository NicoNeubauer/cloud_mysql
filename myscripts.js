const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const app = express()

// Make sure you place body-parser before you CRUD handlers 
app.use(bodyParser.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:123@cluster0.3yfzb.mongodb.net/ABC_Bank?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://test:test@cluster0.3yfzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        // To mentioned to document
        const database = client.db('<db_name>');
        const collection = database.collection('<cluster_name>');

        // To insert data
        const doc = {s_name: "Test 1", s_age: "33", s_city:"Olso"};
        const result = await collection.insertOne(doc);
        console.log(result)

        // Query for retrive data from cluster
        const query = {s_name:"Test 4"};
        const movie = await collection.findOne(query);
        console.log(movie)

        //To update data
        //Create a filter for a movied to update
        const filter = { s_name: "Test_4" };
        // this option dinstructs the metod to create a document if no documents match the filter
        const options = { upsert: true };
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                s_name:
                    "Updated Test 4",
            },
        };
        // const result = await collection.updateOne(filter, updateDoc, options); //uncomment
        // To delete entry
        /*uncomment this to ceck delete query
        const delete_query = { s_name: "Updated Test 4"};
        const result_delete = await collection.deleteOne(delete_query);
        if (result_delete.deletedCount === 1) {
           console.dir("Successfully deleted one document.");
        } else {
          console.log("No documnets mached the query. Deleted 0 documents.");
        }
        */
    } finally {
        //ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

