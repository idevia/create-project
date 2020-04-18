const userSeeder = require("./user.seeder");
const dotenv = require("dotenv");

dotenv.config();
require("../db");

(async () => {
  await userSeeder.seedDB();
  process.exit(0);
})()

