import bcrypt from 'bcryptjs';
import db from '../lib/prisma.js';
// import db from '../lib/pool');

const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    }
  });
}

const findUserByEmail = async (email) => {
  return await db.user.findUnique({
    where: { email }
  });
}

const findUserById = async (id) => {
  return await db.user.findUnique({
    where: { id }
  });
}

// const createUser = async (email, password, name) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const result = await db.query(
//     'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
//     [email, hashedPassword]
//   );
//   return result.rows[0];
// }

// const findUserByEmail = async (email) => {
//   const result = await db.query(
//     'SELECT * FROM users WHERE email = $1',
//     [email]
//   );
//   return result.rows[0];
// }

// const findUserById = async (id) => {
//   const result = await db.query(
//     'SELECT * FROM users WHERE id = $1',
//     [id]
//   );
//   return result.rows[0];
// }

export { createUser, findUserByEmail, findUserById };