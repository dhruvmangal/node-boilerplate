import ServiceBase from "../../lib/serviceBase";

export default class GetUser extends ServiceBase {
  async run() {
    const {
      dbModels: {
        User: UserModel
      }
    } = this.context

    const {
      id
    } = this.args

    try {
      const userData = await UserModel.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email', 'userType'],
        where: {
          id
        },
        raw: true
      })


      return {
        code: 'success',
        data: userData,
        message: 'user fetched successfully'
      }

    }
    catch (e) {
      return {
        code : 'failure',
        message: 'failed to fetch userData'
      }
    }
  }
}
