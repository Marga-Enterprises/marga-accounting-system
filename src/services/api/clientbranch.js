// utils
import * as methods from '@utils/methods';

// requests
import { POST, GET, PUT, DELETE } from '@services/request';

export async function createClientBranchService(payload) {
    return POST('/clientbranch', payload);
}

export async function getClientBranchesService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/clientbranch?${params}`);
}

export async function getClientBranchService(payload) {
    return GET(`/clientbranch/${payload.id}`);
}

export async function updateClientBranchService(payload) {
    return PUT(`/clientbranch/${payload.id}`, payload);
}

export async function deleteClientBranchService(payload) {
    return DELETE(`/clientbranch/${payload.id}`);
}