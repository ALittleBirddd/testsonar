// getToken function
import axios from "../../node_modules/axios/index";

export interface InterfaceGetToken {
	status: Status;
	data: Data;
}

interface Data {
	accessToken: string;
	tokenType: string;
	expiresIn: number;
	expiresAt: number;
}

interface Status {
	code: number;
	description: string;
}

export const getToken = async (): Promise<InterfaceGetToken> => {
	var options = {
		method: "POST",
		url: "https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token",
		headers: {
			Accept: "*/*",
			"User-Agent": "Thunder Client (https://www.thunderclient.com)",
			"Content-Type": "application/json",
			resourceOwnerId: process.env.KEY, // ใส่ resourceOwnerId ที่ได้จากการสมัคร
			requestUId: "{{$guid}}",
			"accept-language": "EN",
		},
		data: {
			applicationKey: process.env.KEY,
			applicationSecret: process.env.SECRET,
		},
	};
															
	const response = await axios.request(options);
	console.log(`== Get Token Success`);
	return response.data as InterfaceGetToken;
};