// utils
import * as methods from '@utils/methods';

// requests
import { POST, GET, PUT, DELETE } from '@services/request';

export async function createCollectionService(payload) {
    return POST('/collection', payload);
};

export async function getCollectionsService(payload) {
    const params = methods.convertQueryString(payload);
    return GET(`/collection?${params}`);
};

export async function getCollectionService(payload) {
    return GET(`/collection/${payload.id}`);
};

export async function updateCollectionService(payload) {
    return PUT(`/collection/${payload.id}`, payload);
};

export async function deleteCollectionService(payload) {
    return DELETE(`/collection/${payload.id}`);
};