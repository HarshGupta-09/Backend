const express = require('express');
const app = express();

//  express.json() middleware to parse JSON bodies
app.use(express.json());


app.post('/data', (req, res) => {
  // Access the parsed JSON data from req.body
  const data = req.body;
//   console.log(data.name)
  console.log('Received data:', data);

 
  res.send('Data received');
});
app.get('/',(req,res)=>{
    res.send("Hello User ")
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});