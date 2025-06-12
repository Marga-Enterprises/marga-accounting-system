// utils
import * as methods from '@utils/methods';

// requests
import { POST } from '@services/request';

export async function loginService(payload) {
  return POST('/auth/login', payload);
}

