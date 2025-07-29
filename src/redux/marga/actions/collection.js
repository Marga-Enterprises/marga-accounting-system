// API
import {
    createCollectionService,
    getCollectionsService,
    getCollectionService,
    updateCollectionService,
    deleteCollectionService
} from '@services/api/collection';


// create collection action
export const createCollectionAction = (payload) => async () => {
    try {
        const res = await createCollectionService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// get collections action
export const getCollectionsAction = (payload) => async () => {
    try {
        const res = await getCollectionsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// get collection action
export const getCollectionAction = (payload) => async () => {
    try {
        const res = await getCollectionService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// update collection action
export const updateCollectionAction = (payload) => async () => {
    try {
        const res = await updateCollectionService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// delete collection action
export const deleteCollectionAction = (payload) => async () => {
    try {
        const res = await deleteCollectionService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};