const errorHandler=(statusCode,message)=>{
    const error=new Error();
    error.message=message+"--custom made";
    error.status=statusCode;
    return error;
}

export default errorHandler;