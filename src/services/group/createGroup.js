import ServiceBase from "../../lib/serviceBase";

export default class CreateGroup extends ServiceBase {
  async run() {
    const {
      dbModels: {
        Group: GroupModel
      },
      req: {
        id: creatorId
      }
    } = this.context

    const {
      name
    } = this.args

    try {
      await GroupModel.create({
        name,
        creatorId,
        users: [creatorId]
      })

      return {
        code: 'success',
        message: `the group '${name}' has been created successfuly`
      }

      } catch (e) {
      return {
        code: 'failure',
        message: e.message
      }
    }
  }
}