const { transporter } = require("../config/nodemailer.config");

async function sendMail(vendors , subject , body) {
 const info = await transporter.sendMail({
    from : `"RPF Generator" <${process.env.USER_EMAIL}>`  ,
    to : [...vendors].join(",") ,
    subject : subject ,
    text : body 
 })
 return info ;   
}

module.exports = { sendMail } ;