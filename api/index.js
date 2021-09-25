const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());
var router = express.Router()

router.get('/health', (req,res) => {
  res.status(200).send({
    status: "OK"
  })
})

router.get('/cities', (req, res) => {
  console.log("CITIES")
  res.send("Success");
})

app.use('/api', router)

app.listen(5000, () =>{
  console.log("Server is listening on port 5000")
})
