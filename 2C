import express from 'express';
import cors from 'cors';

 function check(url) {
 const user = url.replace(/(http:\/\/)/i,'')
                 .replace(/(https:\/\/)/i,'')
                 .replace(/(\/\/)/i,'')
                 .replace(/(@)/i,'')
                 .split('/');
   let username;
   if (user.length>1) {
     username = user[1];
   } else {
    username = user[0];
       }
  return `@${username}`;
 };

const app = express();
app.use(cors());
app.get('/check', (req, res) =>  {
  const username = check(req.query.username);
  return res.send(username);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
