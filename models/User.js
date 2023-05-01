const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'mypassword',
  port: 5432,
});

module.exports = {
  getUsers: async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },

  addUser: async (name, role) => {
    const result = await pool.query('INSERT INTO users (name, role) VALUES ($1, $2) RETURNING *', [name, role]);
    return result.rows[0];
  },

  updateUser: async (id, role) => {
    const result = await pool.query('UPDATE users SET role = $2 WHERE id = $1 RETURNING *', [id, role]);
    return result.rows[0];
  },

  deleteUser: async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  },
};
