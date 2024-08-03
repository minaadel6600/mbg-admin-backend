class HttpError extends Error {
    statusCode: number;
    constructor(_statusCode = 500,message = 'Something went wrong' ) {
      super(message);
      this.statusCode = _statusCode; 
    }
  }
  
export default HttpError;
