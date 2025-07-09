// utils
import * as methods from '@utils/methods';

// requests
import { POST, GET, PUT, DELETE } from '@services/request';

export async function createMachineService(payload) {
    return POST('/machine', payload);
};

export async function getMachinesService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/machine?${params}`);
};

export async function getMachineService(payload) {
    return GET(`/machine/${payload.id}`);
};

export async function updateMachineService(payload) {
    return PUT(`/machine/${payload.id}`, payload);
};

export async function deleteMachineService(payload) {
    return DELETE(`/machine/${payload.id}`);
};