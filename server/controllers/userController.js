import userModule from '../module/usersModule';

export default {
  signUp: (req, res, next) => {
    userModule.signUpUser(req, next)
      .then((data) => {
        res.status(201).json({ status: 201, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  signIn: (req, res) => {
    userModule.signInUser(req)
      .then((data) => {
        if (data.error) {
          res.status(405).json(data);
        }
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  verifyUser: (req, res) => {
    userModule.verifyUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  getUsers: (req, res) => {
    userModule.getUsers()
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  deleteUser: (req, res) => {
    userModule.deleteUser(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  sendResetPasswordLink: (req, res) => {
    userModule.sendResetPassword(req)
      .then((data) => {
        res.status(200).json({ status: 200, data: { url: `http://localhost:3000/api/v1/users/${data.email}/${data.token}/reset-password`, token: data.token, email: data.email } });
      }).catch(error => res.status(500).json({ status: 500, error: error.message }));
  },

  resetUserPassword: (req, res) => {
    userModule.resetUserPassword(req)
      .then((data) => {
        res.status(200).json({ status: 200, data });
      }).catch(error => res.status(500).json({ status: 5000, error: error.message }));
  },
};
