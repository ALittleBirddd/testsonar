import React, { useState } from "react";
// import Breadcrumbs from "@/components/user/Breadcrumbs";
// import Navbar from "@/components/user/Navbar";
// import path from "@/json/UserNavbarPath.json";
import { getToken, InterfaceGetToken } from "@/action/getToken";
import { getQrcode, InterfaceGetQrcode } from "@/action/getQrcode";
import { GetServerSidePropsContext } from "next";
// import { message } from "antd";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

import { useLocalStorage } from "usehooks-ts";
import Swal from "sweetalert2";

interface TableShow {
    value: number;
    type: string;
    category: string;
    date: string;
    tags: string[];
}

interface PayProps {
    token: InterfaceGetToken;
    qrcode: InterfaceGetQrcode;
    qrcode_data: {
        accessToken: string | undefined;
        money: number;
        requestUId: string;
        ppId: string;
        ref1: string;
        ref2: string;
        ref3: string;
    };
}

interface ProductDetails {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
  }

function payError(){
    Swal.fire({
        icon: "error",
        title: "Waiting for payment...",
        text: "You don't make payment yet.",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
}

function paySuccessful(){
    Swal.fire({
        icon: "success",
        title: "Payment completed",
        text: "You have completed your payment.",
      });
}

export default function Pay({ token, qrcode, qrcode_data }: PayProps) {
    const [postData, setPostData] = useState({
        authorization: "Bearer " + qrcode_data.accessToken,
        billerId: qrcode_data.ppId,
        eventCode: "00300100",
        reference1: qrcode_data.ref1,
        reference2: qrcode_data.ref2,
        reference3: qrcode_data.ref3,
        requestUID: qrcode_data.ppId,
        resourceOwnerID: qrcode_data.ppId,
    });

    const [data, setData] = useLocalStorage<TableShow[]>("data", []);
    const [cart, setCart] = useLocalStorage<ProductDetails[]>("cart", [])

    const router = useRouter();

    const onCheckout = async () => {
        

        let url = "/api/getChecking";

        await axios.post(url, postData, {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
            },
        }).then((response) => {
            setData([...data, {
                value: qrcode_data.money,
                type: "รับเงิน",
                category: "รับเงิน",
                date: new Date().toLocaleString(),
                tags: ["รับเงิน"],
            }])
            console.log(response);
            paySuccessful()
             router.push({
                    pathname:"/"})
            setCart([])
            
        }).catch((error) => {
            console.log(error);
            payError()
            
        });
    };

    return (
        <div>
        
            <div className="container mx-auto md:mx-auto">
                {/* <Breadcrumbs
                    step={[
                        {
                            name: "Qr Code",
                            link: "/user/getpaid",
                            icon: <></>,
                        },
                        {
                            name: "pay",
                            link: "",
                            icon: <></>,
                        },
                    ]}
                /> */}

                {/* My Community */}
                {/* <h1 className="text-2xl font-semibold text-white">
                    Pay with <span className="text-primary">QR Code</span>
                </h1> */}

                {token && qrcode && qrcode_data?.money ? (
                    <div className="flex flex-col items-center justify-center w-full h-full p-4 mt-4 bg-white rounded-lg shadow-lg md:w-1/2 md:p-8 md:mt-8 md:ml-auto md:mr-auto">
                        <p className="text-black font-bold text-center text-xl ">
                            Total: {qrcode_data?.money}
                        </p>
                        <Image
                            src={`data:image/png;base64,${qrcode.data?.qrImage}`}
                            alt="QR Code"
                            className="fit"
                            width={250}
                            height={250}
                        />

                        <button
                            className="btn hover:bg-black hover:text-white btn-outline w-full mt-2"
                            onClick={() => {
                                onCheckout();
                            }}
                        >
                            Make the payment
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full p-4 mt-4 bg-white rounded-lg shadow-lg md:w-1/2 md:p-8 md:mt-8 md:ml-auto md:mr-auto">
                        <p className="text-center text-red-600">Something went wrong</p>
                    </div>
                )}
            </div>
        </div>
    );
}

interface data_qrcode {
    accessToken: string | undefined;
    money: number;
    requestUId: string;
    ppId: string;
    ref1: string;
    ref2: string;
    ref3: string;
}
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    try {
        const money = context.query.money as string;

        if (money) {
            console.log("=================== Context ===================");

            const token = await getToken();

            const ref1 = String(Math.floor(Math.random() * 1000000000000000));
            const ref2 = String(Math.floor(Math.random() * 1000000000000000));
            const ref3 = "CWT"
            console.log(`== ref1: ${ref1}`);
            console.log(`== ref2: ${ref2}`);

            const data_qrcode: data_qrcode = {
                accessToken: token.data?.accessToken,
                money: Number(money),
                requestUId: "689275743964899",
                ppId: "689275743964899",
                ref1: ref1,
                ref2: ref2,
                ref3: ref3,
            };

            const qrcode = await getQrcode(data_qrcode);

            console.log("=================== Context ===================");
            return {
                props: {
                    token: token as InterfaceGetToken,
                    qrcode: qrcode as InterfaceGetQrcode,
                    qrcode_data: data_qrcode,
                },
            };
        } else {
            return {
                props: {
                    token: null,
                    qrcode: null,
                    qrcode_data: null,
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                token: null,
                qrcode: null,
                qrcode_data: null,
            },
        };
    }
};