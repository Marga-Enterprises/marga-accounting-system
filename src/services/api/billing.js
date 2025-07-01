// utils
import * as methods from '@utils/methods';

// requests
import { POST, GET, PUT, DELETE } from '@services/request';

export async function createBillingService(payload) {
    return POST('/billing', payload);
}

export async function getBillingsService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/billing?${params}`);
}

export async function getBillingService(payload) {
    return GET(`/billing/${payload.id}`);
}

export async function updateBillingService(payload) {
    return PUT(`/billing/${payload.id}`, payload);
}

export async function deleteBillingService(payload) {
    return DELETE(`/billing/${payload.id}`);
}