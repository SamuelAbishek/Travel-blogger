export const sendResponse = (res,statusCode,contentType,payLoad)=>{
	res.statusCode=statusCode;
	res.setHeader("Content-Type",contentType);
	res.end(payLoad);
};