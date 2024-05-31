const bcrypt = require('bcryptjs');
const db = require('../lib/prisma');

async function createUser(email, password, name) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    }
  });
}

async function findUserByEmail(email) {
  return await db.user.findUnique({
    where: { email }
  });
}

async function findUserById(id) {
  return await db.user.findUnique({
    where: { id }
  });
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
