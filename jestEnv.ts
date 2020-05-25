/**
 * Mocking environment variables for unit tests
 * The variables must be the same as those found in .env for docker-compose.test
 * to mix function calls with end-to-end tests
 */
// Uncomment this if you run unit tests outside of the dedicated docker-compose
// process.env.JWT_SIGNATURE = "weakSignatureForTest"
// process.env.MONGO_URI = "mongodb://localhost:27017/manywords"
// process.env.SERVER_PORT = "4001"