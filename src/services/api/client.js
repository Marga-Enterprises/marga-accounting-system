// utils
import * as methods from '@utils/methods';

// requests
import { POST, GET, PUT, DELETE } from '@services/request';

export async function createClientService(payload) {
    return POST('/client', payload);
}

export async function getClientsService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/client?${params}`);
}

export async function getClientService(payload) {
    return GET(`/client/${payload.id}`);
}

export async function updateClientService(payload) {
    return PUT(`/client/${payload.id}`, payload);
}

export async function deleteClientService(payload) {
    return DELETE(`/client/${payload.id}`);
}