import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";

import {getData} from "./utils/getData.js";	
import {serverStatic} from "./utils/serverStatic.js";
import {handleGet,handlePost,handleNews} from "./handlers/routeHandlers.js";

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req,res)=>{

	if(req.url.startsWith("/api/news")){
		return await handleNews(res);
	}

	else if(req.url.startsWith('/api')){
		if(req.method === "GET"){
			handleGet(res);
		}
		else if(req.method === "POST"){
			handlePost(req,res);
		}

	}	
	
	else if(!req.url.startsWith("/api")){
		const serverStaticPath = await serverStatic(req,res,__dirname);
	}

});

server.listen(PORT,()=>{
	console.log(`Server is running in the PORT ${PORT}`);
});