const express = require('express');
const app = express();
const port = process.env.PORT || 3004;
const user = require('./db/user');
const cors = require('cors');
const nodemailer = require('nodemailer');
const join = require('./db/connection');
app.use(express.json());
app.use(cors({ origin: true }));
function completePayment(name, email, phone, age, batch, res) {
    new user({
        name: name,
        email: email,
        age: age,
        phone: phone,
        batch: batch,
    }).save((err, data) => {
        if (err) {
            res.status(500).send(data)
        }
        var invoice = Math.floor(Math.random() * 1000000000);
        const trainer = join.then((data) => {
            return data
        }).then((data) => {
            console.log(data[data.length - 1]["trainer"][0]['name'])
            sendMail(email, invoice, data[data.length - 1]["trainer"][0]['name'])
        })
        res.status(201).send({ message: "Payment completed successfully", invoice: invoice});
    });
}

function sendMail(to, invoice, trainer){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'prachiworks01@gmail.com',
            pass: 'myazzfflesyqgphb',
        },
    });

    let mailOptions = {
        from: 'prachiworks01@gmail.com',
        to: to,
        subject: 'Thank you for registering with us!',
        html: `<div style="display:flex, flex-direction:column, justify-content:center"> <h1>Thank you for registering with us!</h1> <h3>invoice: ${invoice}</h3><table border="1" style="border:"1px solid black" "><tr><td>Product</td><td>Subtotal</td>   </tr><tr><td>One Month Yoga Class Fee</td><td>Rs. 500</td></tr></table><br/><p>Your Trainer is ${trainer}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    };
app.post('/api/payment', (req, res) => {
    completePayment(req.body.name, req.body.email, req.body.phone, req.body.age, req.body.batch, res);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port);