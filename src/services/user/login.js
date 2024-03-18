import ServiceBase from "../../lib/serviceBase.js"
import ajv from "../../lib/ajv.js"
import { sign } from "jsonwebtoken";
import config from "../../config/app.config.js";
import crypto from 'crypto';

const schema = {

}

export default class LoginUser extends ServiceBase {
  async run() {
    const {
      dbModels: {
        User: UserModel
      }
    } = this.context

    const {
      email,
      password
    } = this.args

    try {
      const userData = await UserModel.findOne({
        attributes: ['id', 'userType'],
        where: {
          email,
          password: crypto.createHash('md5').update(password).digest('hex')
        },
        raw: true
      })

      if(!userData?.id){
        return {
          code: 'failure',
          message: 'email or password is incorrect'
        }
      }

      const secret = config.get('auth.jwt_secret')

      const token = sign(
        userData,
        secret,
        { expiresIn: 60 * 60 }
      )

      return {
        data: {
          token
        },
        code: 'success',
        message: 'user logged in successfully'
      }
    } catch (e) {
      return {
        code: 'failure',
        message: 'unable to login user'
      }
    }
  }
}