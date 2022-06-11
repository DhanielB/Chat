import { Request, Response } from 'express';
import createDatabase from '../models/createDatabase';
import createMailer from '../models/createMailer'

const mailer = new createMailer();
const { Client, User, Message } = createDatabase;

class createController {
  constructor() {
    Client.sync();
  }
  async loginPage(req: Request, res: Response) {
    const { email = '', password = '' } = req.query;

    const UserExists = await User.findAndCountAll({
      where: {
        email: email,
        password: password,
        verified: true,
      },
    });

    if (UserExists.count == 0) {
      return res.status(404).json({
        status: 404,
        error: 'Login is invalid or not verified',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Logged in successfully',
    });
  }

  async registerPage(req: Request, res: Response) {
    const { name = '', email = '', password = '' } = req.query;

    const UserExists = await User.findAndCountAll({
      where: {
        email: email,
      },
    });

    if (UserExists.count < 0) {
      return res.status(404).json({
        status: 404,
        error: 'Already registred user',
      });
    }

    await User.create({
      name: name,
      email: email,
      password: password,
      verified: false,
    })

    mailer.send()

    return res.status(200).json({
      status: 200,
      message: 'Registred user successfully',
    });
  }

  async sendMessage(req: Request, res: Response) {
    const { name = '', email = '', password = '', message = '' } = req.query;

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

    await Message.create({
      name: name,
      password: password,
      message: message
    })

    return res.status(200).json({
      status: 200,
      message: 'Logged in successfully',
    });
  }
}

export default createController;
