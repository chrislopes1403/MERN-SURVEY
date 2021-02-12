const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected!");
}).catch(err => console.log(err));

const app =express();

app.use(
    cookieSession({
        maxAge: 1 *24 *60 *60 *1000,  // 1 day / 24 hours / 60 min / 60 sec / 1000 milsec
        keys:[keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const r = require('randomstring');

console.log(r.generate(64));

const PORT= process.env.PORT || 8080;
app.listen(PORT);