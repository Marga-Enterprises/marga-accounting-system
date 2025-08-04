// utils
import * as methods from '@utils/methods';

// requests
import { POST, GET } from '@services/request';

export async function createPaymentService(payload) {
    return POST('/payment', payload);
};

export async function getAllPaymentsService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/payment?${params}`);
};

export async function getPaymentService(payload) {
    return GET(`/payment/${payload.id}`);
};


export async function cancelPaymentService(payload) {
    return POST(`/payment/cancel/${payload.id}`, payload);
};
