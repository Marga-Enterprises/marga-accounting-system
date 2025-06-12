// API
import {
    createClientBranchService,
    getClientBranchesService,
    getClientBranchService,
    updateClientBranchService,
    deleteClientBranchService
} from '@services/api/clientbranch';


// create client branch action
export const createClientBranchAction = (payload) => async () => {
    try {
        const res = await createClientBranchService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get client branches action
export const getClientBranchesAction = (payload) => async () => {
    try {
        const res = await getClientBranchesService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get client branch action
export const getClientBranchAction = (payload) => async () => {
    try {
        const res = await getClientBranchService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// update client branch action
export const updateClientBranchAction = (payload) => async () => {
    try {
        const res = await updateClientBranchService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// delete client branch action
export const deleteClientBranchAction = (payload) => async () => {
    try {
        const res = await deleteClientBranchService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};