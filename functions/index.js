/* eslint-disable promise/always-return */

// import { environment } from '../src/environments/environment';
// import { environment} from './environments/environment';

const functions = require('firebase-functions');
const stripe = require('stripe')('***');
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    service: 'gmail',
    auth: {
        user: '****', // generated ethereal user
        pass: '*****', //
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        let dest = req.body.dest;
        let subject = req.body.subject;

        const mailOptions = {
            from: 'Aplicatie fitness Licenta <sebastiangiurgiu1998@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: subject, // email subject
            attachments: [
                {
                    filename: 'file-name.pdf', // <= Here: made sure file name match
                    path: 'pdf/file-name.pdf', // <= Here
                    contentType: 'application/pdf'
                }
            ]
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});


exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    return cors(request,response, async () => {

        let token = request.body.token;
        let amount = request.body.amount;
        // eslint-disable-next-line promise/catch-or-return
        stripe.charges.create({
            amount: amount,
            currency: "usd",
            description: 'A avut loc o tranzactie din aplicatia Fitness',
            source: token
        }).then((charge) => {
                // asynchronously called
                response.send(charge);
            })
            .catch(err =>{
                console.log(err);
            });


    })

});
