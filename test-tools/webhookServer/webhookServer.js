const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
router.post('/event', async (req, res, next) => {
  console.log(req.body);
  res.status(200).send();
});

app.use('/hooks', router);

const server = app.listen(4001, function(){
    console.log("Webhook Server is listening to PORT:" + server.address().port);
});
