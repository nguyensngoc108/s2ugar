import api from './httpServices';

// Create order (Public)
export const createOrder = (orderData) => {
    return api.post('/orders', orderData);
};

// Get all orders (Admin only)
export const getOrders = () => {
    return api.get('/orders');
};

// Get single order by ID (Admin only)
export const getOrderById = (id) => {
    return api.get(`/orders/${id}`);
};

// Update order (Admin only)
export const updateOrder = (id, orderData) => {
    return api.put(`/orders/${id}`, orderData);
};

// Delete order (Admin only)
export const deleteOrder = (id) => {
    return api.delete(`/orders/${id}`);
};
