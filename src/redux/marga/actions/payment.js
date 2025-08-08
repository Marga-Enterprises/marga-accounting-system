// API
import {
    createPaymentService,
    getAllPaymentsService,
    getPaymentService,
    updatePaymentService,
    cancelPaymentService
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


// update payment action
export const updatePaymentAction = (payload) => async () => {
    try {
        const res = await updatePaymentService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
}


// cancel payment action
export const cancelPaymentAction = (payload) => async () => {
    try {
        const res = await cancelPaymentService(payload);
        return res;
    } catch (err) {
        return { error: err.response?.data?.msg };
    }
}