import { AuthProvider } from '@pankod/refine-core';
import nookies from 'nookies';
// import { useNavigator} from 'react-router-dom'
const mockUsers = [
  {
    username: 'admin',
    email: 'admin@refine.dev',
    roles: ['admin'],
  },
  {
    username: 'editor',
    email: 'editor@refine.dev',
    roles: ['editor'],
  },
];

export const authProvider: AuthProvider = {
  login: ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    // const admin = mockUsers[1];
    // console.log(`email ${email} ${username} ${password} ${remember}`);
    // if (email === 'rohan.magar19@vit.edu') {
    //   console.log('Inside');
    //   window.location.href = 'http://localhost:3000/';
    // } else {
    //   return Promise.resolve('/dashboard');
    // }
    return Promise.resolve();

    // return Promise.reject();
  },
  logout: () => {
    nookies.destroy(null, 'auth');
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: (ctx) => {
    const cookies = nookies.get(ctx);
    return cookies['auth'] ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => {
    const auth = nookies.get()['auth'];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
  getUserIdentity: () => {
    const auth = nookies.get()['auth'];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return Promise.resolve(parsedUser.username);
    }
    return Promise.reject();
  },
};
