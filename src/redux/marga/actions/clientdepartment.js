// API
import {
    createClientDepartmentService,
    getClientDepartmentsService,
    getClientDepartmentService,
    updateClientDepartmentService,
    deleteClientDepartmentService
} from '@services/api/clientdepartment';


// create client department action
export const createClientDepartmentAction = (payload) => async () => {
    try {
        const res = await createClientDepartmentService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get client departments action
export const getClientDepartmentsAction = (payload) => async () => {
    try {
        const res = await getClientDepartmentsService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get client department action
export const getClientDepartmentAction = (payload) => async () => {
    try {
        const res = await getClientDepartmentService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// update client department action
export const updateClientDepartmentAction = (payload) => async () => {
    try {
        const res = await updateClientDepartmentService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// delete client department action
export const deleteClientDepartmentAction = (payload) => async () => {
    try {
        const res = await deleteClientDepartmentService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};