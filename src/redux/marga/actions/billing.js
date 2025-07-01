// API
import {
    createBillingService,
    getBillingsService,
    getBillingService,
    updateBillingService,
    deleteBillingService
} from '@services/api/billing';


// create billing action
export const createBillingAction = (payload) => async () => {
    try {
        const res = await createBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get billings action
export const getBillingsAction = (payload) => async () => {
    try {
        const res = await getBillingsService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// get billing action
export const getBillingAction = (payload) => async () => {
    try {
        const res = await getBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// update billing action
export const updateBillingAction = (payload) => async () => {
    try {
        const res = await updateBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};


// delete billing action
export const deleteBillingAction = (payload) => async () => {
    try {
        const res = await deleteBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.msg };
    }
};