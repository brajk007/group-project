const {sendEmail} = require('./mail')

const mailController=(req,res)=>{
    try {
        sendEmail('ash24biradar@gmail.com','Your Order confirmed successfully');
        res.status(200).send('sent successfully')
    } catch (error) {
      res.status(404).send('cannot sent mail')  
    }
}


module.exports = {mailController}