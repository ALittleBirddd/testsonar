import Head from "next/head"
import Image from "next/image"
import styles from "@/styles/Product.module.css"
import Link from "next/link"
import Swal from "sweetalert2"
import { useState} from "react"
import { useLocalStorage } from "usehooks-ts"



export async function getStaticPaths()
{
    const res = await fetch("https://dummyjson.com/products?limit=35")
    const data = await res.json()
    const paths = data.products.map((item:any) =>{
        return{
            params :{id:String(item.id)}
        }
        
    })
    console.log(paths)
    return{
        paths,
        fallback:false //กรณีที่ path ไม่ถูก จะเป็น page 404 
    }
}    
export async function getStaticProps({params}:any){
    const id = params.id
    const res = await fetch("https://dummyjson.com/products/"+id)
    const data = await res.json()
    
 
    return{
        props:{products:data}
    }
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
  
  interface Count {
    [key: string]: number;
  }

export default function ProductDetail( {products}:any ){
    const [data,setData] = useState<ProductDetails[]>(products)
    const [cart, setCart] = useLocalStorage<ProductDetails[]>("cart", [])
    const [count,setCount] = useLocalStorage<Count>("count",{});

    

    return(
        <>
        <Head>
            <title>{products.title}</title>
        </Head>
        <section className="flex items-center  xl:h-screen font-poppins  ">
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
            <div className="flex flex-wrap ">
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                    <img src={products.thumbnail} alt=""
                        className="relative z-40 object-cover w-full h-96 rounded-3xl"/>
                </div>
                <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                    <h2 className="mb-4 text-4xl font-semibold text-black">
                        รายการสินค้า : {products.title}
                    </h2>
                    <p className="mb-2 text-base leading-7 text-black">ข้อมูลพื้นฐาน : {products.description}</p>
                    <p className="mb-2 text-base leading-7 text-black">ราคา : ${products.price}</p>
                    <p className="mb-2 text-base leading-7 text-black">ส่วนลดร้อยละ : {products.discountPercentage}</p>
                    <p className="mb-2 text-base leading-7 text-black">การให้คะแนน : {products.rating}/5</p>
                    <p className="mb-2 text-base leading-7 text-black">คลังสินค้า : {products.stock}</p>
                    <p className="mb-2 text-base leading-7 text-black">แบรนด์ : {products.brand}</p>
                    <p className="mb-2 text-base leading-7 text-black">หมวดหมู่ : {products.category}</p>
                    {/* <button 
                        className="px-4 py-3 text-gray-100 bg-black transition-all transform border border-black rounded-3xl hover:bg-gray-800">
                        Add to cart
                    </button> */}
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

