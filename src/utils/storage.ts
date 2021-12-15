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
};
