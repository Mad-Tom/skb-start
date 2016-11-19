import express from 'express';
import cors from 'cors';
import canonize from './canonize';

const app = express();
app.use(cors());
app.get('/', function (req, res) {
  req.query.url;
  return res.json({
    url: req.query.url,
    username: canonize(req.query.url)

  });
});


app.get('/task2A', (req, res)=> {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  return res.send(sum.toString());
  });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
