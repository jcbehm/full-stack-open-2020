require('dotenv').config()

let PORT = process.env.PORT
// voitko poistaa tän täältä
let MONGODB_URI = process.env.TEST_MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}