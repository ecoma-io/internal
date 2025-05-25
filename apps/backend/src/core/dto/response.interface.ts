export interface IResponseDTO<T> {
  success: boolean;

  data?: T;
}
