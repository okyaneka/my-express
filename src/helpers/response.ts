export type ApiResponse<T> = {
  success: boolean;
  message: string;
  code: number;
  data: T;
};

const success = <T>(data: T): ApiResponse<T> => ({
  success: true,
  message: "success",
  code: 200,
  data,
});

const error = <T>(
  message: string,
  code: number = 400,
  data?: T
): ApiResponse<T | {}> => ({
  success: false,
  message,
  code,
  data: data || {},
});

export default { success, error };
