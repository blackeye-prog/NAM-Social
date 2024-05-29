import nodemailer from 'nodemailer'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user:'monu914087@gmail.com',
        pass:'kgmn awim jfzv fmns'

    }

})

transporter.verify((error,success)=>{
    if(error){
        console.log(error);

    }
    else{
        console.log("Ready for message");
        console.log(success)
    }

})

const sendEmail= async (mailoptions)=>{
    try{
         await transporter.sendMail(mailoptions);
         return;
    }
    catch(error){
        throw error;

    }
}

export default sendEmail;