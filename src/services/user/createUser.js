import ServiceBase from "../../lib/serviceBase";
import ajv from "../../lib/ajv";

const schema = {
  type: 'object',
  properties: {
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string'},
    password: {type: 'string'},
    userType: {type: 'string'}
  },
  required: ['firstName', 'lastName', 'email', 'password', 'userType']
}

// const constraints = ajv.compile(schema)

export default class CreateUser extends ServiceBase {
  get constraints () {
    return constraints || {}
  }

  async run(){
    const {
      dbModels: {
        User: UserModel
      }
    } = this.context

    const {
      firstName,
      lastName,
      email,
      password,
      userType
    } = this.args

    try{

      const isDuplicateEmail = await UserModel.findOne({
        attributes: ['id'],
        where: {
          userType,
          email
        }
      })

      if(isDuplicateEmail){
        return {
          code: 'failure',
          message: 'Email already exists'
        }
      }

      const result = await UserModel.create({
        firstName,
        lastName,
        email,
        password,
        userType
      })
  
      if(result){
        return {
          code: 'success',
          message: 'user created successfuly'
        }
      }

    }catch(e){
      console.log(e.message)
      return {
        code: 'failure',
        message: 'User created failed'
      }
    }
    
  }
}