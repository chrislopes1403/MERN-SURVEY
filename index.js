const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Surveys');
require('./services/passport');


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected!");
}).catch(err => console.log(err));

const app =express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 1 *24 *60 *60 *1000,  // 1 day / 24 hours / 60 min / 60 sec / 1000 milsec
        keys:[keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());



require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


  if(process.env.NODE_ENV==='production')
  {
    app.use(express.static('client/build'));

    const path = require('path');
   
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });

  }



const PORT= process.env.PORT || 8080;
app.listen(PORT);