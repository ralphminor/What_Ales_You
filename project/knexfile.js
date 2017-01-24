module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/what_ales_you'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
}
