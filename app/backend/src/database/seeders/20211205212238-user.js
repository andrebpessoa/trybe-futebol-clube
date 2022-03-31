require('dotenv').config();

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: process.env.SECRET_ADMIN, // secret_admin
      },
      {
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: process.env.SECRET_USER, // secret_user
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
