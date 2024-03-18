import redis from 'redis';
import config from '../config/app.config';

const redisConnection = redis.createClient({
  url: 'redis://' + config.get('pub_sub_redis_db.host') + ':' + config.get('pub_sub_redis_db.port') + ''
})

redisConnection.connect()

redisConnection.on('ready', () => {
  console.log('Connected!')
})

redisConnection.on('error', (err) => {
  console.log('Error in the Connection: ' + err)
})

export default redisConnection

