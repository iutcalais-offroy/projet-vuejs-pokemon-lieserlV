export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.user.id);
      localStorage.setItem('user', data.user.email);
      return { success: true, token: data.token, id: data.user.id, user: data.user.email };
    } else {
      return { success: false, message: data.message };
    }
  } catch (e) {
    return { success: false, message: e };
  }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

export const getUser = () => {
  return localStorage.getItem('user');
}

export const getUserId = () => {
  return localStorage.getItem('id');
}

export const register = async (email: string, password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return { success: false, message: "Les mots de passes ne correspond pas" };
  }

  try {
    const response = await fetch('https://pokemon-api-seyrinian-production.up.railway.app/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (e) {
    return { success: false, message: e };
  }
};