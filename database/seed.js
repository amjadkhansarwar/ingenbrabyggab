const User = require('../models/User');

(async () => {

  await User.create({
    email: 'admin@example.com', 
    password: "password", 
    name: "Admin",
    role: "admin",
  })
  await User.create({
    email: 'client@example.com', 
    password: "password", 
    name: "Client",
    role: "client",
  })
  await User.create({
    email: 'worker@example.com', 
    password: "password", 
    name: "Worker",
    role: "worker",
  })
})()