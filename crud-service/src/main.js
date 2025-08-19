const { MongoClient } = require("mongodb");
const http = require('http');

const PORT = 5000;
const uri = 'mongodb+srv://dark_papa:dark_papa1234@mycluster1.iv9rj.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster1';
const client = new MongoClient(uri);
const databaseName = "development_db_for_project_launcher"
const collectionName = "project_data";

const server = http.createServer((req, res) => {
  if(req.method == 'POST'){
    let body = ''
    req.on("data", chunk => {
      body += chunk.toString();
    })

    req.on("end", () => writeToDb(res, body))
  } 

  if(req.method == 'GET'){
    readAllDocuments().then(docs => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(docs));
      }).catch(err => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("Error reading documents");
      });
  }

});

server.listen(PORT, () => {
  // Only called once -> when server is ready to accept requests
  console.log(`Server running at http://localhost:${PORT}`);
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
    return results
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

async function writeToDb(res, rawData) {
  try {
    const data = JSON.parse(rawData); // parse JSON from request

    // Insert into MongoDB
    await client.connect();
    const db = client.db(databaseName);
    const coll = db.collection(collectionName);

    const result = await coll.insertOne(data);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ insertedId: result.insertedId }));
    console.log("Inserted document:", result.insertedId);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end("Error inserting document");
  } finally {
    await client.close();
  }
}