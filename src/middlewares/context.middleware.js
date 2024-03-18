import models, { sequelize } from "../db/models/index.js"

export default function contextMiddleware (automaticTransaction= false) {

  return async (req, res, next) => {
    const context = {
      req,
      reqTimeStamp: Date.now(),
      sequelize,
      dbModels: models,
    }

    if(automaticTransaction){
      context.sequelizeTransaction = await sequelize.transaction()
      const onFinishAndClose = async () => {
        if (~transactionStatuses.indexOf(context.sequelizeTransaction.finished)) {
          return
        }
        if (res?.payload?.error) {
          await context.sequelizeTransaction.rollback()
          return
        }

        await context.sequelizeTransaction.commit()
        if(res.queueLogId){
          await publishToRedis.queue({ QueueLog: { queueLogId: res.queueLogId } })
        }
      }

      await res.on('finish',  onFinishAndClose)
      await res.on('close', onFinishAndClose)
    }
   
    req.context = context
    next()
  }
}