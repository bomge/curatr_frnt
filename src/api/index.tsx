export const fakeAuthAPI = async (
  username: string,
  password: string
): Promise<{ success: boolean; token: string | null }> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username.toLocaleLowerCase() === 'admin' && password === '1') {
        const payload = btoa(JSON.stringify({
          "role":"admin",
          name: 'Admin Admin'
        }))
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.XNTy5_Ym9yvHhBdxXnlxUDqDlXEYOFxdMYXTTJNVXzE`; // Simulated admin JWT token
        resolve({ success: true, token });
      } else if (username === 'manager' && password === '1') {
        const payload = btoa(unescape(encodeURIComponent(JSON.stringify({
          "role":"manager",
          name: 'OLeg dmitro'
        }))))
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.XNTy5_Ym9yvHhBdxXnlxUDqDlXEYOFxdMYXTTJNVXzE`; // Simulated manager JWT token
        resolve({ success: true, token });
      } else {
        resolve({ success: false, token: null });
      }
    }, 1000);
  });
};