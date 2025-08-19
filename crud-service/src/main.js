const { MongoClient } = require("mongodb");
const http = require('http');

const PORT = 5000;
const uri = 'mongodb+srv://dark_papa:dark_papa1234@mycluster1.iv9rj.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster1';
const client = new MongoClient(uri);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  write_to_db()
  res.end('Added a document to MongoDB: ' + new Date().toISOString());
});

server.listen(PORT, () => {
  // Only called once -> when server is ready to accept requests
});

async function write_to_db() {
  try {
    // Connect to the client
    await client.connect();

    // Select database and collection
    const database = client.db("myDatabase");
    const collection = database.collection("myCollection");

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