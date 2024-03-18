import ServiceBase from "../../lib/serviceBase.js"
import { deleteToken } from "../../lib/handleLoginConnection.js"

export default class Logout extends ServiceBase{
  async run (){

    const {
      req: {
        id: userId
      }
    } = this.context
    
    deleteToken(userId);

    return {
      code: 'success',
      message: 'user logged out successfully'
    }
  }
}