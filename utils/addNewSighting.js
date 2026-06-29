import fs from "node:fs/promises";
import path from "node:path";	
import {getData} from "./getData.js";


export async function addNewSighting(newSighting){
	try{
		const existData = await getData();
		existData.push(newSighting);

		const pathJSON = path.join("data","data.json");

		await fs.writeFile(
			pathJSON,
			JSON.stringify(existData,null,2),
			"utf8"
			);	
	}
	catch(err){
		throw new Error(err);
	}
};