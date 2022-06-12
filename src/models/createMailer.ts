import nodemailer from 'nodemailer'

class createMailer {
    async send() {
        const transporter = nodemailer.createTransport({ 
            service: 'Hotmail', 
            auth: { 
                user: 'dhanielbra@outlook.com', 
                pass: 'Senhalivre123' 
            } 
        });
        
        await transporter.sendMail({
            to: 'dhanielbrandao2@gmail.com',
            from: 'Chat INC. <dhanielbra@outlook.com>',
            subject: 'Verificação de login',
            html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <center>
                            <h1>Verificação de email</h1>

                            <br></br>

                            <p>
                                Seja bem vindo, aqui você ira conversar com pessoas incriveis!
                            </p>

                            <br></br>

                                <p>Clique aqui para se verificar (<a href="">Site</a>)</p>

                            <br></br>

                            <bottom>
                                <p>Caso não for você simplesmente ignore este email</p>
                            </bottom>
                        <center>
                    </body>
                    </html>
            `
        })
    }
}

export default createMailer
