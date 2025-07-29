// API
import {
    createPaymentService,
    getAllPaymentsService,
    getPaymentService,
    deletePaymentService
} from '@services/api/payment';


// create payment action
export const createPaymentAction = (payload) => async () => {
    try {
        const res = await createPaymentService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// get all payments action
export const getAllPaymentsAction = (payload) => async () => {
    try {
        const res = await getAllPaymentsService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// get payment action
export const getPaymentAction = (payload) => async () => {
    try {
        const res = await getPaymentService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};


// delete payment action
export const deletePaymentAction = (payload) => async () => {
    try {
        const res = await deletePaymentService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
};
