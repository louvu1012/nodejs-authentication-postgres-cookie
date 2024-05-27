const pool = require('../db');
const bcrypt = require('bcryptjs');

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO User (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    'SELECT * FROM User WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

async function findUserById(id) {
    const result = await pool.query(
        'SELECT * FROM User WHERE id = $1',
        [id]
    );
    return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
