import { GaxiosResponse } from 'gaxios';

export default function unwrapGaxiosData<T>(response: GaxiosResponse<T>): T {
  return response.data;
}
