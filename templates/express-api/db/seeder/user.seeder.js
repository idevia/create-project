const User = require("../../api/v1/models/User");
const faker = require("faker");

const seedDB = async () => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push({
      name: faker.name.firstName(),
      email: faker.internet.email().toLocaleLowerCase(),
      password: "$2b$10$1Mdsbe2K6RlZfFTWB80kIeJp6V0L8LmU8QmQ2uF9/7U5kxhXW8M2i" // Password
    });
  }
  try {
    await User.insertMany(arr);
    console.log("USER collection seeded");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { seedDB };
