// Mock authentication service
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];
  
  export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          resolve({ success: true, username });
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000);
    });
  };
  
  export const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  };

  