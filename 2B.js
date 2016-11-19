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


app.get('/task2B', (req, res)=> {


  const re = new RegExp('[0-9_/$&+,:;=?@#|\'<>.^*()%!-]');
    const match = req.query.fullname.search(re);

    if(match != -1){
  return res.send('Invalid fullname');
  }
  if (!req.query.fullname) {
    return res.send('Invalid fullname')}
  const sum = req.query.fullname.split(' ');    
  switch(sum.length.toString()||0){
    case '1': return res.send(sum.toString());
      break;
    case '2': return res.send(sum[(sum.length-1)].toString() + ' ' + sum[0][0]+'.');
      break;
    case '3': return res.send(sum[(sum.length-1)].toString() + ' ' + sum[0][0]+'.'+ ' ' + sum[1][0] +'.');
      break;
    default: return res.send('Invalid fullname');
      break;
  }      ;

  });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
