const { MongoClient } = require("mongodb");
const http = require('http');

const PORT = 5000;
const uri = 'mongodb+srv://dark_papa:dark_papa1234@mycluster1.iv9rj.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster1';
const client = new MongoClient(uri);
const databaseName = "development_db_for_project_launcher"
const collectionName = "project_data";

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  readAllDocuments()
});

server.listen(PORT, () => {
  // Only called once -> when server is ready to accept requests
});

async function readAllDocuments() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select database and collection
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Find all documents
    const cursor = collection.find({}); // empty filter = all documents
    const results = await cursor.toArray(); // convert cursor to array

    console.log("All documents:");
    console.log(results);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

async function write_to_db() {
  try {
    // Connect to the client
    await client.connect();

    // Select database and collection
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Document to insert
    const doc = {
      name: "Alice",
      age: 25,
      city: "Toronto"
    };

    // Insert document
    const result = await collection.insertOne(doc);
    console.log("Inserted document with _id:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Always close the connection
    await client.close();
  }
}