const User = require('../models/User');

(async () => {

  await User.create({
    email: 'admin@example.com', 
    password: "password", 
    name: "Banan Paj",
  })
  await User.create({
    email: 'customer@example.com', 
    password: "password", 
    name: "Grill Korv",
  })
})()