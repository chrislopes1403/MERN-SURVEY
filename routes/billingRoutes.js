const keys = require('./../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const User = require('./../models/User');

module.exports=(app)=>{
   

    app.post('/api/stripe', async (req,res)=>{
        

        if(!req.user)
        {
          return  res.status(401).send("User not logged in");
        }

        const currentUser = req.user;

        const charge = await stripe.charges.create({
            amount:500,// 100 cents
            currency:'usd',
            description:'$5 for one credit',
            source: req.body.id
        }).catch((err)=>console.log(err));

        currentUser.credits += 5;
        const updatedUser = await currentUser.save();

        res.send(updatedUser);

    });

};
