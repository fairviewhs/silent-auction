module.exports = {
  secrets: {
    sessions: '8Py9iODJ5wh702fU1E22O03n6V3Rn33s',
    saltRounds: 11,
    mail: {
      user: 'silentauction@fairviewhs.org',
      pass: 'b63G5h22%Umk'
    }
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
  },
  root: 'http://localhost:3000'
}
