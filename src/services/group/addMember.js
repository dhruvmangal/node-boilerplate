import { Op } from "sequelize";
import ServiceBase from "../../lib/serviceBase";

export default class AddMember extends ServiceBase {
  async run(){
    const {
      dbModels: {
        Group: GroupModel,
        User: UserModel
      }
    } = this.context

    const {
      groupId,
      userEmails
    } = this.args

    try{

      const userIds = await UserModel.findAll({
        attributes: ['id'],
        where: {
          email: {
            [Op.in]: userEmails
          }
        },
        raw: true
      })
      
      const group = await GroupModel.findOne({
        where: {
          id: groupId
        }
      })

      group.users = [...new Set([...group.users, ...userIds.map(i => i.id)])]

      await group.save()

      return {
        code: 'success',
        message: 'users have been added successfully'
      }

    }catch(e){
      return {
        code: 'failure',
        message: e.message
      }
    }
  }
}