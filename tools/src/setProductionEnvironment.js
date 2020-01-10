import fs from "fs";

// copy server secrets for production from the config folder
// docker-compose needs a .env file at runtime
// this will be obsolete when using docker images
fs.copyFile("../../config_many-words/.env", "../.env", error => {
  if (error) {
    console.error(`[setProductionEnvironment] cannot copy .env file\n`, error);
    return;
  }
  console.info(
    `\\033[1;32m[setProductionEnvironment] successfully set .env file`
  );
});
