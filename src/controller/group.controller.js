import CreateGroup from "../services/group/createGroup";
import GetGroup from "../services/group/getGroup";
import AddMember from "../services/group/addMember";
import RemoveMember from "../services/group/removeMember";

export default class GroupController {
  static async getGroup (req, res, next){
    try {
      const {result, successful, errors} = await GetGroup.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }

  static async createGroup (req, res, next){
    try {
      const {result, successful, errors} = await CreateGroup.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }

  static async getAllGroups (req, res, next) {

  }

  static async addMember (req, res, next){
    try {
      const {result, successful, errors} = await AddMember.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }

  static async removeMember (req, res, next){
    try {
      const {result, successful, errors} = await RemoveMember.execute(req.body, req.context)
      res.payload = result
      next()
    } catch (e) {
      next(e)
    }
  }
}