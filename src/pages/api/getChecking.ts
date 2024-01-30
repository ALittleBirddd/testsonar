import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Main | Status>
) {
	const { method } = req;

	console.log(
		`new Request from ${req.socket.remoteAddress} at ${new Date()
			.toISOString()
			.slice(0, 10)} ${new Date().toLocaleTimeString()}`
	);

	console.log("=========== Request ==========");
	console.log("Request body: ", req.body);
	console.log("==============================");

	if (method !== "POST") {
		console.log("Method Not Allowed");
		res.status(405).json({
			code: 405,
			description: "Method Not Allowed",
		});
		return;
	}

	const {
		authorization,
		billerId,
		eventCode,
		reference1,
		reference2,
		reference3,
		requestUID,
		resourceOwnerID,
	} = req.body;
	if (
		!authorization ||
		!billerId ||
		!eventCode ||
		!reference1 ||
		!reference2 ||
		!reference3 ||
		!requestUID ||
		!resourceOwnerID
	) {
		console.log("Bad Request");
		res.status(400).json({
			code: 400,
			description: "Bad Request",
		});
		return;
	}

	// FIXME: ต้องเปลี่ยนเป็นวันที่ของวันถัดไป !!WHY
	var date = new Date();
	date.setDate(date.getDate());
	var dateThai = date.toISOString().slice(0, 10);

	var options = {
		method: "GET",
		url: "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/inquiry",
		params: {
			eventCode: eventCode,
			billerId: billerId,
			reference1: reference1,
			reference2: reference2,
			reference3: reference3,
			transactionDate: dateThai,
		},
		headers: {
			Accept: "*/*",
			authorization: authorization,
			requestUID: requestUID,
			resourceOwnerID: authorization.split(" ")[1],
			"accept-language": "EN",
		},
	};

	console.log(options);

	axios
		.request(options)
		.then((response) => {
			console.log("=========== Response ==========");
			console.log("Response body: ", response.data);
			console.log("===============================");
			res.status(200).json(response.data);
		})
		.catch((error) => {
			console.log("=========== Error ==========");
			console.log("Error body: ", error.response?.body);
			res.status(500).json({
				code: 500,
				description: "Internal Server Error",
			});
		});
}

export interface Main {
	status: Status;
	data: Datum[];
}

export interface Datum {
	eventCode: string;
	transactionType: string;
	reverseFlag: string;
	payeeProxyId: string;
	payeeProxyType: string;
	payeeAccountNumber: string;
	payeeName: string;
	payerProxyId: string;
	payerProxyType: string;
	payerAccountNumber: string;
	payerName: string;
	sendingBankCode: string;
	receivingBankCode: string;
	amount: string;
	transactionId: string;
	fastEasySlipNumber: string;
	transactionDateandTime: Date;
	billPaymentRef1: string;
	billPaymentRef2: string;
	billPaymentRef3: string;
	currencyCode: string;
	equivalentAmount: string;
	equivalentCurrencyCode: string;
	exchangeRate: string;
	channelCode: string;
	partnerTransactionId: string;
	tepaCode: string;
}

export interface Status {
	code: number;
	description: string;
}