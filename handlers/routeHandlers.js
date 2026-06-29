import {getData} from "../utils/getData.js";
import {sendResponse} from "../utils/sendResponse.js";
import {parseJSONBody} from "../utils/parseJSONBody.js";
import {addNewSighting} from "../utils/addNewSighting.js";
import {sanitizeData} from "../utils/sanitizeData.js";
import {sightingEvents} from "../events/sightingEvents.js";
import {stories} from "../data/stories.js";

import path from "node:path";

export async function handleGet(res){
	const Data = await getData();

	const content = JSON.stringify(Data);

	sendResponse(res,200,"application/json",content);

};

export async function handlePost(req,res){
	try{
		const parsedData = await parseJSONBody(req); 
		const sanitizedData = sanitizeData(parsedData);
		await addNewSighting(sanitizedData);	

		sightingEvents.emit("sighting-added",sanitizedData);

		sendResponse(res,201,"application/json",JSON.stringify(sanitizedData));
	}
	catch(err){
		sendResponse(res,400,"application/json",JSON.stringify({error:err}));
	}
};

export async function handleNews(res){
	res.statusCode=200;
	res.setHeader("Content-Type","text/event-stream");
	res.setHeader("Cache-Control","no-cache");
	res.setHeader("Connection","keep-alive");

	try{
		setInterval(()=>{
			let randomIndex = Math.floor(Math.random() * stories.length);

			res.write(
				`data: ${
					JSON.stringify(
					{
						event : "new-updates",
						story : stories[randomIndex]
					})
			}\n\n`);
	
		},3000);
	}
	catch(err){
		console.log(`Error: ${err}`);
	}
};