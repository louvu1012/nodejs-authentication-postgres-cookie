const bcrypt = require('bcryptjs');
// const db = require('../lib/prisma');
const db = require('../lib/pool');

// async function createUser(email, password, name) {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   return await db.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//       name,
//     }
//   });
// }

// async function findUserByEmail(email) {
//   return await db.user.findUnique({
//     where: { email }
//   });
// }

// async function findUserById(id) {
//   return await db.user.findUnique({
//     where: { id }
//   });
// }

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

async function findUserById(id) {
  const result = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
