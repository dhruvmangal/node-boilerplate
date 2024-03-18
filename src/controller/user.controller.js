import LoginUser from "../services/user/login.js"
import CreateUser from "../services/user/createUser.js"
import GetUser from "../services/user/getUser.js"
import UpdateUser from "../services/user/updateUser.js"

export default class UserController {
  static async getUsers(req, res, next) {
    try {
      const {
        result,
        successful,
        errors
      } = await GetUser.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }

  static async createUser(req, res, next) {
    try {
      const {result, successful, errors} = await CreateUser.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }

  static async loginUser(req, res, next) {
    try {
      const {result, successful, errors} = await LoginUser.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const {result, successful, errors} = await UpdateUser.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }


} 