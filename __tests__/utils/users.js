module.exports = {
  admin: {
    validAdmin: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    },
    invalidAdmin: {
      id: 1,
      username: 'Admin',
      role: 'undefined',
      email: 'admin.com',
      password: 'senha_invalida',
    },
  },
  user: {
    validUser: {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    },
    invalidUser: {
      id: 2,
      username: 'User',
      role: 'undefined',
      email: 'user.com',
      password: 'senha_invalida',
    },
  },
};
