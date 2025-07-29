// API
import { 
    createClientService, 
    getClientsService, 
    getClientService, 
    updateClientService, 
    deleteClientService
} from '@services/api/client';


// create client action 
export const createClientAction = (payload) => async () => {
  try {
    const res = await createClientService(payload);
    return res;
  } catch (err) {
    return { error: err.response?.data?.msg };
  }
};


// get clients action
export const getClientsAction = (payload) => async () => {
  try {
    const res = await getClientsService(payload);
    return res;
  } catch (err) {
    return { error: err.response?.data?.msg };
  }
};


// get client action
export const getClientAction = (payload) => async () => {
  try {
    const res = await getClientService(payload);
    return res;
  } catch (err) {
    return { error: err.response?.data?.msg };
  }
};


// update client action
export const updateClientAction = (payload) => async () => {
  try {
    const res = await updateClientService(payload);
    return res;
  } catch (err) {
    return { error: err.response?.data?.msg };
  }
};


// delete client action
export const deleteClientAction = (payload) => async () => {
  try {
    const res = await deleteClientService(payload);
    return res;
  } catch (err) {
    return { error: err.response?.data?.msg };
  }
};
