module.exports = {
  port: process.env.PORT || 3000,
  session: {
    secure: process.env.SECURE || false
  },
  db: {
    connection: process.env.MONGO_URI
  },
  log: process.env.LOG_LEVEL || "info"
};