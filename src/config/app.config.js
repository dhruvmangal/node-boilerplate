import convict from 'convict'
import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync('.env')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env'))

  for (const key in envConfig) {
    process.env[key] = envConfig[key]
  }
}

const config = convict({
  app: {
    name: {
      doc: 'Name of the service',
      format: String,
      default: 'user-backend'
    },
    url: {
      doc: 'URL of the service',
      format: String,
      default: 'user-backend:8003',
      env: 'APP_URL'
    },
    appName: {
      doc: 'Name of the application',
      format: String,
      default: 'ChatAPP Api',
      env: 'APP_NAME'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },
  origin: {
    doc: 'cors origin',
    format: String,
    default: 'true',
    env: 'ORIGIN'
  },
  db: {
    name: {
      doc: 'Database Name',
      format: String,
      default: 'chatapp',
      env: 'DB_NAME'
    },
    username: {
      doc: 'Database user',
      format: String,
      default: 'postgres',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database password',
      format: '*',
      default: 'postgres',
      env: 'DB_PASSWORD'
    },
    host: {
      doc: 'DB host',
      format: String,
      default: '127.0.0.1',
      env: 'DB_HOST'
    },
    port: {
      doc: 'DB PORT',
      format: 'port',
      default: '5432',
      env: 'DB_PORT'
    },
    read_username: {
      doc: 'Database user',
      format: String,
      default: 'postgres',
      env: 'READ_DB_USERNAME'
    },
    read_password: {
      doc: 'Database password',
      format: '*',
      default: 'postgres',
      env: 'READ_DB_PASSWORD'
    },
    read_host: {
      doc: 'DB host',
      format: String,
      default: '127.0.0.1',
      env: 'READ_DB_HOST'
    },
    read_name: {
      doc: 'Database Name',
      format: String,
      default: 'chatapp',
      env: 'READ_DB_NAME'
    },
    read_port: {
      doc: 'DB PORT',
      format: 'port',
      default: '5432',
      env: 'READ_DB_PORT'
    },
  },

  redis_db: {
    password: {
      doc: 'Redis Database password',
      format: '*',
      default: '',
      env: 'REDIS_DB_PASSWORD'
    },
    host: {
      doc: 'Redis DB host',
      format: String,
      default: '127.0.0.1',
      env: 'REDIS_DB_HOST'
    },
    port: {
      doc: 'Redis DB PORT',
      format: 'port',
      default: 6379,
      env: 'REDIS_DB_PORT'
    }
  },

  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },
  auth: {
    jwt_secret: {
      doc: 'Secret key for token.',
      format: String,
      default: 'notronisca',
      env: 'APP_SECRET'
    },
    expiry_time: {
      doc: 'Secret key for token.',
      format: Number,
      default: 60 * 30,
      env: 'TOKEN_EXPIRE_TIME'
    },
    res_token_expiry_time: {
      doc: 'Secret key for token.',
      format: Number,
      default: 60 * 60,
      env: 'RES_TOKEN_EXPIRE_TIME'
    },
    live_casino_token_expiry_time: {
      doc: 'Secret key for token',
      format: Number,
      default: 60 * 30,
      env: 'LIVE_CASINO_TOKEN_EXPIRE_TIME'
    }
  },

  pub_sub_redis_db: {
    password: {
      doc: 'Redis Database password',
      format: '*',
      default: '',
      env: 'PUB_SUB_REDIS_DB_PASSWORD'
    },
    host: {
      doc: 'Redis DB host',
      format: String,
      default: '127.0.0.1',
      env: 'PUB_SUB_REDIS_DB_HOST'
    },
    port: {
      doc: 'Redis DB PORT',
      format: 'port',
      default: 6379,
      env: 'PUB_SUB_REDIS_DB_PORT'
    }
  },
  socket: {
    encryptionKey: {
      default: '',
      env: 'SOCKET_ENCRYPTION_KEY'
    },
    maxPerUserConnection: {
      default: 10,
      env: 'SOCKET_MAX_PER_USER_CONNECTION'
    }
  },
  queue_worker: {
    apiUrl: {
      default: 'https://queue.8dexsuperadmin.com/api/v1/job/',
      env: 'QUEUE_WORKER_API_URL'
    }
  }
})

config.validate({ allowed: 'strict' })

export default config
