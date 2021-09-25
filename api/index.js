const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());
const PORT = config.app.port;


const citiesRoutes = require('./routes/cities.routes')();
const weatherRoutes = require('./routes/weather.routes')();


app.get('/health', (req,res) => {
  res.status(200).send({
    status: "OK"
  })
})

app.use('/api/cities', citiesRoutes)

app.use('/api/weather', weatherRoutes)


app.listen(PORT, () =>{
  console.log(`Server is listening on port ${PORT}`)
})
