const _ =require('lodash');
const paths = require('path');
const { Path } = require('path-parser');
const {URL} =require('url');
const url = require('url');    
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports=(app)=>{
   

    app.post('/api/survey',async(req,res)=>{

        const { id } = req.body;

        const survey = await Survey.find({_id:id}).select({
        });
        console.log(survey)
        res.send(survey);
    });

    app.post('/api/response',async(req,res)=>{

        const {surveyId,values}=req.body;
        let questions = Object.entries(values).map(( [k, v] ) => ({ [k]: v }));
        
        questions.map((question)=>{

            var questionName = Object.keys(question)[0];
            Survey.updateOne({
                _id:surveyId,
                questions:{
                    $elemMatch:{ question: questionName}
                    }
                },{
                    $push:{'questions.$.reply':question[questionName]},
                    lastResponded:new Date()       
            }).exec();

        });
        res.send({});
    });




    app.get('/api/surveys',requireLogin,async(req,res)=>{

        const surveys = await Survey.find({_user:req.user.id}).select({
            recipients:false
        });

        res.send(surveys);
    });

    app.post('/api/surveys',requireLogin, requireCredits,async(req,res)=>{
        
        const { title, subject, body, recipients,...rest } = req.body;

        const questions=_.map(rest);

        
        const survey = new Survey({
            title,
            subject,
            body,
            recipients:recipients.split(',').map((email)=>{
                return{email:email.trim()}
            
            }),
            questions:questions.map((question)=>{return {question:question,reply:[]}}),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey,surveyTemplate(survey));
        try{
        await mailer.send();
        await survey.save();
        req.user.credits-=1;
        const updatedUser = await req.user.save();

        res.send(updatedUser);
        } catch(err){
            res.status(422).send(err);
        }
        
    });


    app.post('/api/surveys/webhooks',(req,res)=>{

        // for every element passed run a function
       /* const events = _.map(req.body,(event)=>{
            const pathname = new URL(event.url).pathname;
            const parser = new Path('/api/surveys/:surveyId/:choice');
            // test pathname for variables return null if vars are not present
            const match =parser.test(pathname);
             
            if(match)
                {
                    return { mail:event.email,surveyId:match.surveyId,choice:match.choice};
                }

        });
        // remove null false undefined
        const compactEvents=_.compact(events);
        const unqueEvents =_.uniqBy(compactEvents,'email','surveyId');*/

        const parser = new Path('/api/surveys/:surveyId/:choice');

        //chain===============================================================
        const events= _.chain(req.body)   
            .map((event)=>{
                // test pathname for variables return null if vars are not present
                const match =parser.test(new URL(event.url).pathname);
                
                if(match)
                    {
                        return { email:event.email,surveyId:match.surveyId,choice:match.choice};
                    }

            })
            // remove null false undefined
            .compact()
            .uniqBy('email','surveyId')
            .each(({surveyId,email,choice})=>{
                Survey.updateOne({
                    _id:surveyId,
                    recipients:{
                        $elemMatch:{ email: email,responded:false}
                        }
                    },{
                        $inc:{[choice]:1},
                        $set:{'recipients.$.responded':true},
                        lastResponded:new Date()       
                }).exec();
            })
            .value();
        //chain==========================================================
        console.log('got request',events);
        res.send({});

    });

    app.get('/api/surveys/:surveyId/:choice',async (req,res)=>{

        var path = req.url.split("/");
        var surveyId = path[3];

        res.redirect(url.format({
            pathname:"/feedback",
            query: {
               "survey": surveyId,
             }
          }));

    });
    app.post('/api/delete',requireLogin,async(req,res)=>{

        const { id }=req.body;

        await Survey.deleteOne({ _id: id }, (err, survey) => {
            // Handle any possible database errors
                if (err) return res.status(500).send(err);
            });

        const surveys =await Survey.find({_user:req.user.id}).select({recipients:false});
        

        res.send(surveys);

    });





};