const nodemailer = require('nodemailer');

exports.send = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kcetsymposium@gmail.com',
          pass: 'Sympo070'
        }
    });
      
    var mailOptions = {
        from: 'kcetsymposium@gmail.com',
        to: req.body.toAddress,
        subject: 'Forget Password Mail',
        html: req.body.message
    };
      
    transporter.sendMail(mailOptions, function(err){
        if(err) {
            res.send({status: "500", message: "E-Mail Not Sent", error: err});
        } else {
            res.send({status: "200", message: "E-Mail Sent"});
        }
    });
};
