import ServiceBase from "../../lib/serviceBase";

export default class RemoveMember extends ServiceBase{
  async run(){
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
      groupId,
      userEmail
    } = this.args

    try{
      const {id: userId} = await UserModel.findOne({
        attributes: ['id'],
        where: {
          email: userEmail
        },
        raw: true
      })

      const group = await GroupModel.findOne({
        where: {
          id: groupId,
          creatorId: id
        }
      })

      if(!group?.id){
        return {
          code: 'failure',
          message: 'You are not authorized to remove this user'
        }
      }
      const updatedUsers = group.users
      const indexOfUserId = updatedUsers.indexOf(userId)

      if(indexOfUserId > -1){
        updatedUsers.splice(indexOfUserId, 1)
      }

      group.users = updatedUsers
      if(group.creatorId === userId)
        group.creatorId = updatedUsers[0]

      await group.save()

      return {
        code: 'success',
        message: 'removed user successfully'
      }

    }catch(e){
      return {
        code: 'failure',
        message: 'issue in removing user'
      }
    }
  }
}