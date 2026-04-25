import api from './httpServices';

// Get all cakes
export const getCakes = () => {
    return api.get('/cakes');
};

// Get single cake by ID
export const getCakeById = (id) => {
    return api.get(`/cakes/${id}`);
};

// Get signature cake
export const getSignatureCake = () => {
    return api.get('/cakes/signature');
};

// Create cake (Admin only)
export const createCake = (cakeData) => {
    return api.post('/cakes', cakeData);
};

// Update cake (Admin only)
export const updateCake = (id, cakeData) => {
    return api.put(`/cakes/${id}`, cakeData);
};

// Delete cake (Admin only)
export const deleteCake = (id) => {
    return api.delete(`/cakes/${id}`);
};

// Create signature cake (Admin only)
export const createSignatureCake = (cakeData) => {
    return api.post('/admin/signature', cakeData);
};

// Update signature cake (Admin only)
export const updateSignatureCake = (id, cakeData) => {
    return api.put(`/admin/signature/${id}`, cakeData);
};

// Create cake via admin panel (Admin only)
export const createAdminCake = (cakeData) => {
    return api.post('/admin/cakes', cakeData);
};

// Update cake via admin panel (Admin only)
export const updateAdminCake = (id, cakeData) => {
    return api.put(`/admin/cakes/${id}`, cakeData);
};

// Delete cake via admin panel (Admin only)
export const deleteAdminCake = (id) => {
    return api.delete(`/admin/cakes/${id}`);
};
