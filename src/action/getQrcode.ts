import axios from "../../node_modules/axios/index";

export interface InterfaceGetQrcode {
	status: Status;
	data: Data;
}

interface Data {
	qrRawData: string;
	qrImage: string;
}

interface Status {
	code: number;
	description: string;
}
interface qrcode_data {
	accessToken: string | undefined;
	money: number;
	requestUId: string;
	ppId: string;
	ref1: string;
	ref2: string;
	ref3: string;
}

export const getQrcode = async ({
	accessToken,
	money,
	requestUId,
	ppId,
	ref1,
	ref2,
	ref3,
}: qrcode_data): Promise<InterfaceGetQrcode> => {
	if (!accessToken) {
		// throw new Error("accessToken is undefined");
		return {
			status: {
				code: 500,
				description: "Internal Server Error",
			},
			data: {
				qrRawData: "",
				qrImage: "",
			},
		};
	}
	var options = {
		method: "POST",
		url: "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create",
		headers: {
			"Content-Type": "application/json",
			authorization: "Bearer " + accessToken,
			resourceOwnerId: process.env.KEY,
			requestUId: requestUId,
			"accept-language": "EN",
		},
		data: {
			qrType: "PP",
			ppType: "BILLERID",
			ppId: ppId,
			amount: money,
			ref1: ref1,
			ref2: ref2,
			ref3: ref3,
		},
	};

	const result = await axios(options);
	console.log(`== Get Qrcode Success`);
	return result.data;
};