const prefix = "triplan";

export const storage = {
  getToken: () => {
    try {
      const value = localStorage.getItem(`${prefix}_token`);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setToken: (token: string) => {
    localStorage.setItem(`${prefix}_token`, JSON.stringify(token));
  },
  clearToken: () => {
    localStorage.removeItem(`${prefix}_token`);
  },
  getUserId: () => {
    try {
      const value = localStorage.getItem(`${prefix}_user_id`);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setUserId: (userId: number) => {
    localStorage.setItem(`${prefix}_user_id`, JSON.stringify(userId));
  },
  clearUserId: () => {
    localStorage.removeItem(`${prefix}_user_id`);
  },
};
