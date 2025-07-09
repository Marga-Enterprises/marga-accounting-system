// API
import {
    createMachineService,
    getMachinesService,
    getMachineService,
    updateMachineService,
    deleteMachineService
} from '@services/api/machine';


// create machine action
export const createMachineAction = (payload) => async () => {
    try {
        const res = await createMachineService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get machines action
export const getMachinesAction = (payload) => async () => {
    try {
        const res = await getMachinesService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get machine action
export const getMachineAction = (payload) => async () => {
    try {
        const res = await getMachineService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// update machine action
export const updateMachineAction = (payload) => async () => {
    try {
        const res = await updateMachineService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// delete machine action
export const deleteMachineAction = (payload) => async () => {
    try {
        const res = await deleteMachineService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};