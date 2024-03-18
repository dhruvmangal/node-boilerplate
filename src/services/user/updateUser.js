import ServiceBase from "../../lib/serviceBase";

export default class UpdateUser extends ServiceBase {
  async run() {
    const {
      dbModels: {
        User: UserModel
      },
      req: {
        id
      }
    } = this.context

    const updateObj = {}
    try {
      if (this.args.firstName) {
        updateObj.firstName = this.args.firstName
      }

      if (this.args.lastName) {
        updateObj.lastName = this.args.lastName
      }

      if (this.args.email) {
        updateObj.email = this.args.email
      }

      if (this.args.password) {
        updateObj.password = this.args.password
      }

      const updatedUser = await UserModel.update(
        updateObj,
        {
          where: {
            id
          },
          raw: true
        })

      if (!updatedUser) {
        return {
          code: 'failure',
          message: 'error in updation'
        }
      }

      return {
        code: 'success',
        message: 'user details are updated successfully'
      }
    } catch (e) {
      return {
        code: 'failure',
        message: e.message
      }
    }
  }
}