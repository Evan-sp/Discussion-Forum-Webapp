const express = require('express');
const app = express();
const cors = require('cors')

const routes = require('./routes');
var admins = [];
app.set('admins', admins)
//if (NODE_ENV !== 'production') {
   app.use(cors())
//}

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use('/threads', cors(), routes.threads)

var admin = {username: 'qwerty', password: 'qwerty'};
app.post('/admin/login', (req, res) => {

   if(req.body.username == admin.username && req.body.password == admin.password){

      admins.push(req.body.userId);
      res.send('success, logged in')
   }
   else
      res.send('fail')
});

const port =  process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port}`);
