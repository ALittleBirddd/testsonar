import styles from "@/styles/About.module.css"
import Image from "../../node_modules/next/image"
import Head from "../../node_modules/next/head"
import { useLocalStorage } from "../../node_modules/usehooks-ts/dist/esm/index"
import Link from "../../node_modules/next/link"

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
export default function About(){
  const [pro, setPro] = useLocalStorage<ProductDetails[]>("pro", [])
  


    return(
      
    <>
    <Head>
        <title>About | Nonvy</title>
    </Head>
    <section className="flex items-center  xl:h-screen font-poppins  ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap ">
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <img src="/online-shop.jpeg" alt=""
                        className="relative z-40 object-cover w-full h-96 rounded-3xl"/>
                </div>
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                    <h2 className="mb-4 text-4xl font-semibold text-black">
                        About Us
                    </h2>
                    <p className="mb-10 text-base leading-7 text-black">
                    Every business has an origin story worth telling, and usually, one that justifies why you even do business and have clients.

Some centennial enterprises have pages of content that can fit in this section, while startups can tell the story of how the company was born, its challenges, and its vision for the future.
                    </p>
                    <a href="#"
                        className="px-4 py-3 text-black transition-all transform border border-black rounded-3xl hover:bg-black hover:text-gray-100">
                        Discover more
                    </a>
                </div>
            </div>
        </div>
    </section>
     
    </>
    )
}