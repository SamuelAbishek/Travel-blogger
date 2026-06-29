import path from "node:path";
import fs from "node:fs/promises";
import {getContentType} from "./getContentType.js";

import {sendResponse} from "./sendResponse.js";

export const serverStatic = async(req,res,__dirname) =>{

	const publicDir = path.join(__dirname,'public');

	const filePath = path.join(
		publicDir,
		req.url === '/' ? 'index.html' : req.url);

	const ext = path.extname(filePath);

	const contentType = getContentType(ext);

	try{
		const content = await fs.readFile(filePath);
		sendResponse(res,200,contentType,content);
	}
	catch(err){
		console.log("error: \n");
		console.log("Error Code: \n"+err.code);
		if(err.code === "ENOENT"){
			const content = await fs.readFile(path.join(publicDir,"404.html"));
			sendResponse(res,404,'text/html',content);
		}
		else{
			sendResponse(res,500,'text/html','<html><h1>Server Error: ${err.code}</h1></html>');
		}
		console.log(err);
	}
	return filePath;
};	