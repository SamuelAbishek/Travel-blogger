import sanitizeHtml from "sanitize-html";

export function sanitizeData(parsedData){ // incoming data is of Object type coz it is of Key:Val pair
	const sanitizedData = {};
	for(const [key,val] of Object.entries(parsedData)){
		if(typeof val === "string"){ // only checking string because string input from user only can be corupted like adding scripts and tags
			sanitizedData[key] = sanitizeHtml(val,{allowedTags: ['b'] , allowedAttributes:{}});
		}
		else{ // here date,timestrap,etc.. mostly cant be courpted
			sanitizedData[key] = val;
		}
	}
	return sanitizedData;
};