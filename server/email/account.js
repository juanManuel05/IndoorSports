const sgMail = require('@sendgrid/mail');
const sengridAPIKey = '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';

sgMail.setApiKey(sengridAPIKey);

const sendWelcomeEmail = (email)=>{
    sgMail.send({
        from:'juan@gmail.com',
        to:email,
        subject:'WELCOME',
        text:'welcome'
    });
};

const senCancelationEmail = (email)=>{
    sgMail.send({
        from:'juan@gmail.com',
        to:email,
        subject:'CANCELATION',
        text:'cancelation'
    });
};

module.exports = {sendWelcomeEmail,sendWelcomeEmail}