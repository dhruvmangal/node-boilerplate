import config from './app.config.js'

const commonSetting = {
  username: null,
  password: null,
  port: config.get('db.port'),
  dialect: 'postgres',
  logging: (process.env.NODE_ENV === 'development'),
  dialectOptions: {
    application_name: config.get('app.name')
  },
  define: {
    underscored: true,
    timestamps: true
  },
  replication: {
      read: [
          { host: config.get('db.read_host'), database: config.get('db.read_name'), username: config.get('db.read_username'), password: config.get('db.read_password') }
      ],
      write: { host: config.get('db.host'), database: config.get('db.name'), username: config.get('db.username'), password: config.get('db.password') }
  },
  pool: {
    max: 50,
    min: 0,
    idle: 5000,
    evict: 5000,
    acquire: 200000
  }
}

export const development = {
  ...commonSetting
}

export const test = {
  ...commonSetting
}

export const staging = {
  ...commonSetting
}

export const production = {
  ...commonSetting
}
