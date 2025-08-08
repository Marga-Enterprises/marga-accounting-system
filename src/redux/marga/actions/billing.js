// API
import {
    createBillingService,
    getBillingsService,
    getUnbilledDepartmentsService,
    getBillingService,
    updateBillingService,
    deleteBillingService,
    createBulkBillingsService
} from '@services/api/billing';


// create billing action
export const createBillingAction = (payload) => async () => {
    try {
        const res = await createBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// create bulk billings action
export const createBulkBillingsAction = (payload) => async () => {
    try {
        const res = await createBulkBillingsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// get billings action
export const getBillingsAction = (payload) => async () => {
    try {
        const res = await getBillingsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// get unbilled departments action
export const getUnbilledDepartmentsAction = (payload) => async () => {
    try {
        const res = await getUnbilledDepartmentsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// get billing action
export const getBillingAction = (payload) => async () => {
    try {
        const res = await getBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// update billing action
export const updateBillingAction = (payload) => async () => {
    try {
        const res = await updateBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// delete billing action
export const deleteBillingAction = (payload) => async () => {
    try {
        const res = await deleteBillingService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};