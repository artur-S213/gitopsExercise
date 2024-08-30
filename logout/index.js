const axios = require('axios');
const express = require('express');
const app = express();
const port = 3001;


app.use(express.json);


// Replace with the external IP of your Kubernetes service
const baseUrl = 'http://pingpong-service:4001';
let globalCounter = 0;

async function fetchData() {
  try {
    console.log("Fetch data");
    const response = await axios.get(`${baseUrl}/pingpong`);
    globalCounter = response.data;
    console.log('GET /data response:', globalCounter);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const getTimeStamp = () => {
    return new Date().toISOString();
}

app.get('/logout', (req,res) => {
    fetchData();
    // let counter = 0;
    // console.log(counter);

    res.send(`
      <p>${getTimeStamp()}</p> 
      <p>${globalCounter}</p>
      `);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



