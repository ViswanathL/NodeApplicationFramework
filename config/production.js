module.exports = {
  port: process.env.PORT || 3000,
  session: {
    secure: true
  },
  db: {
    connection: process.env.SECURE || process.env.MONGO_URI
  },
  log: process.env.LOG_LEVEL || "error"
};