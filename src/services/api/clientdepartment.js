// utils
import * as methods from '@utils/methods';

// requests
import { POST, GET, PUT, DELETE } from '@services/request';

export async function createClientDepartmentService(payload) {
    return POST('/clientdepartment', payload);
}

export async function getClientDepartmentsService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/clientdepartment?${params}`);
}

export async function getClientDepartmentService(payload) {
    return GET(`/clientdepartment/${payload.id}`);
}

export async function getClientDepartmentByNameService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/clientdepartment/name?${params}`);
}

export async function updateClientDepartmentService(payload) {
    return PUT(`/clientdepartment/${payload.id}`, payload);
}

export async function deleteClientDepartmentService(payload) {
    return DELETE(`/clientdepartment/${payload.id}`);
}