/* eslint-disable no-undef */
MONGO_INITDB_ROOT_USERNAME = "my_secure_admin_username";
MONGO_INITDB_ROOT_PASSWORD = "my_secure_password";
MONGO_USER = "db_username";
MONGO_PASSWORD = "db_password";
MONGO_INITDB_DATABASE = "production_db_name";

conn = new Mongo();
db = conn.getDB("admin");
db.auth(MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD);
db = db.getSiblingDB(MONGO_INITDB_DATABASE);
db.createUser({
  user: MONGO_USER,
  pwd: MONGO_PASSWORD,
  roles: [{ role: "readWrite", db: MONGO_INITDB_DATABASE }]
});
