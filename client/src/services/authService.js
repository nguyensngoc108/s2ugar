import api from './httpServices';

// Admin login
export const adminLogin = (email, password) => {
    return api.post('/auth/login', { email, password });
};

// Admin register
export const adminRegister = (username, email, password) => {
    return api.post('/auth/register', { username, email, password });
};

// User login
export const userLogin = (email, password) => {
    return api.post('/auth/user/login', { email, password });
};

// User register
export const userRegister = (username, email, password, address, phone) => {
    return api.post('/auth/user/register', { username, email, password, address, phone });
};

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Token utilities
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};
