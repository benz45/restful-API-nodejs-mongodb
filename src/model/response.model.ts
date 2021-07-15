// * Interface for using response default api
export interface IResponse {
  status: boolean;
  message: string | [];
  data?: object | [];
}
