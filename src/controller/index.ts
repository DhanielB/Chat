import crypto from 'crypto';
import transporter from '@sendgrid/mail';
import { Request, Response } from 'express';
import createDatabase from '../models/createDatabase';

transporter.setApiKey(
  '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'
);

const { Client, User, Message } = createDatabase;

class createController {
  constructor() {
    this.init();
  }

  async init() {
    await Client.sync();
  }

  async loginPage(req: Request, res: Response) {
    var { API_KEY, email = '', password = '' } = req.query;

    if (!API_KEY || API_KEY != process.env.API_KEY) {
      return res.status(403).json({
        status: 403,
        data: {},
        error: 'Unauthorized',
      });
    }

    const passwordString: string = String(password);

    password = crypto
      .createHash('md5')
      .update(passwordString)
      .digest('hex');

    const UserExists = await User.findAndCountAll({
      where: {
        email: email,
        password: password,
        verified: true,
      },
    });

    if (UserExists.count == 0) {
      return res.status(400).json({
        status: 400,
        error: 'Login is invalid or not verified',
      });
    }

    return res.status(200).json({
      status: 200,
      data: UserExists.rows[0],
      message: 'Logged in successfully',
    });
  }

  async registerPage(req: Request, res: Response) {
    var { API_KEY, name = '', email = '', password = '' } = req.query;

    const passwordString: string = String(password);

    if (!API_KEY || API_KEY != process.env.API_KEY) {
      return res.status(403).json({
        status: 403,
        data: {},
        error: 'Unauthorized',
      });
    }

    if (name == '' || email == '' || password == '') {
      return res.status(400).json({
        status: 400,
        data: {},
        error: 'Bad Request',
      });
    }

    password = crypto
      .createHash('md5')
      .update(passwordString)
      .digest('hex');

    const UserExists = await User.findAndCountAll({
      where: {
        email: email,
      },
    });

    if (UserExists.count > 0) {
      return res.status(404).json({
        status: 404,
        error: 'Already registred user',
      });
    }

    const UserCreated = await User.create({
      name: name,
      email: email,
      password: password,
      verified: false,
    });
    const UserCreatedReadable = JSON.parse(JSON.stringify(UserCreated));

    const url = `https://3000-dhanielb-chat-h86ohfipn5f.ws-us47.gitpod.io/api/v1/verify/${UserCreatedReadable.userId}?API_KEY=${process.env.API_KEY}`;

    transporter.send({
      to: 'dhanielbrandao2@gmail.com',
      from: 'dhanielbra@outlook.com',
      subject: 'Verificação de login',
      text: 'Verificação de login',
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
  
                                  <a href="${url}">Clique aqui para se verificar</a>
  
                              <br></br>
  
                              <bottom>
                                  <p>Caso não for você simplesmente ignore este email</p>
                              </bottom>
                          <center>
                      </body>
                      </html>
              `,
    });

    return res.status(201).json({
      status: 201,
      data: UserCreated,
      message: 'Registred user successfully',
    });
  }

  async verifyCode(req: Request, res: Response) {
    const { API_KEY } = req.query;
    const { code = '' } = req.params;

    if (!API_KEY || API_KEY != process.env.API_KEY) {
      return res.status(403).json({
        status: 403,
        data: {},
        error: 'Unauthorized',
      });
    }

    const codeString: string = String(code);

    const CodeExists = await User.findAndCountAll({
      where: {
        userId: codeString,
      },
    });

    if (CodeExists.count == 0) {
      return res.status(404).json({
        status: 404,
        error: 'Code is invalid',
      });
    }

    const deletedUser = await User.findOne({
      where: {
        userId: codeString,
      },
    });

    const deletedUserReadable = await JSON.parse(JSON.stringify(deletedUser));

    deletedUserReadable.verified = true;

    await User.destroy({
      where: {
        userId: codeString,
      },
    });

    const updatedUser = await User.create(deletedUserReadable);

    return res.status(200).json({
      status: 200,
      data: updatedUser,
      message: 'Code is valid',
    });
  }

  async sendMessage(req: Request, res: Response) {
    const {
      API_KEY,
      name = '',
      email = '',
      password = '',
      message = '',
    } = req.query;

    if (!API_KEY || API_KEY != process.env.API_KEY) {
      return res.status(403).json({
        status: 403,
        data: {},
        error: 'Unauthorized',
      });
    }

    const UserExists = await User.findAndCountAll({
      where: {
        email: email,
        password: password,
        verified: true,
      },
    });

    if (UserExists.count < 0) {
      return res.status(404).json({
        status: 404,
        error: 'Login is invalid or not verified',
      });
    }

    const MessageCreated = await Message.create({
      name: name,
      password: password,
      message: message,
    });

    return res.status(200).json({
      status: 200,
      data: MessageCreated,
      message: 'Logged in successfully',
    });
  }
}

export default createController;
