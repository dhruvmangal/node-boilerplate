import ServiceBase from "../../lib/serviceBase";
import { Op } from "sequelize";

export default class GetGroup extends ServiceBase{
  async run (){
    const {
      dbModels: {
        Group: GroupModel,
        User: UserModel
      },
      req: {
        id
      }
    } = this.context

    const {
      groupId
    } = this.args

    try{
      const groupData = await GroupModel.findOne({
        attributes: ['name', 'users'],
        where: {
          id: groupId
        },
        raw: true
      })

      const userData = await UserModel.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: {
          id: {
            [Op.in]: groupData.users
          }
        },
        raw: true
      })

      console.log(userData)
      
      const users = userData.reduce((acc, cur)=> {
        acc.push({name: `${cur.firstName} ${cur.lastName}`, id: cur.id, email: cur.email })
        return acc
      }, [])

      return {
        code: 'success',
        message: 'group fetched successfully',
        data: {
          ...groupData,
          users: users
        }
      }

    }catch(e){
      return {
        code: 'failure',
        message: e.message
      }
    }
  }
}