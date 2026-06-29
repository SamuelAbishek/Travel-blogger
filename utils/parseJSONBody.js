export async function parseJSONBody(req){
	let body="";
	for await(const chunks of req){
		body += chunks;
	}
	try{
		return JSON.parse(body);
	}
	catch(err){
		throw new Error(`Invalid JSON formate: ${err}`);
	}
};