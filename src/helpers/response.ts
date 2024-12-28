const success = (data: any = null, message: string = "success") => {
  return {
    code: 200,
    message,
    data: data || null,
    error: null,
  };
};

const error = (error: any = null, message: string = "", code: number = 400) => {
  return {
    code,
    message,
    data: null,
    error: error || null,
  };
};

const response = { success, error };

export default response;
