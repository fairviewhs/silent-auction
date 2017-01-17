module.exports = {
  secrets: {
    sessions: 'AAAAAAAAAA',
    saltRounds: 11
  },
  sequelize: {
    user: 'SilentAuctions',
    password: 'AAAAAAAAAA',
    database: 'silent-auction',
    options: {
      host: 'localhost',
      logging: console.log,
      dialect: 'mysql'
    }
  }
}
