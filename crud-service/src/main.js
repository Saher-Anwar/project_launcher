import express from 'express';

const PORT = 5000;
const app = express();


app.use(express.json());  //express middleware to read incoming request bodies


app.post('/project-launcher', (req, res) => {
  

});







server.listen(PORT, () => {
  console.log(`CRUD Service running at http://localhost:${PORT}`);
});