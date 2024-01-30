
import Image from "../../node_modules/next/image"
import Link from "../../node_modules/next/link"
import Head from "../../node_modules/next/head"
import Carousel from "@/components/Carousel"
//<Image src="/shopping.svg" width={300} height={300} alt={"logo"} className="m-5"/>

const slides = ["/sale.jpeg" , "sale3.webp"]

export default function Home() {
  return (
    <>
    <Head>
      <title>Home page | Nonvy</title>
      <meta name="keywords" content="Skincare shop,Beauty products,Nonvy"/>
    </Head>

    <div className="flex items-center flex-wrap justify-center flex-col m-5 " >
    <h1 className="text-{#252525} text-5xl m-10">Home page</h1>

    <Carousel>
    {slides.map(s=>(
      <img src={s} alt="slides" />
    ))}

    </Carousel>
     
    </div>

    <h1 className="m-5 text-[20px]">หมวดหมู่สินค้า</h1>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10  place-content-center" >

      <div className="hover:bg-[#435658] flex justify-center text-center transition-all">
      <Link href="/products/Smartphones">
      <Image src="/smartphone.png" width={115} height={115} alt={"logo"} className=""/>
      <h2 className="">อิเล็กทรอนิกส์</h2>
      </Link>
      </div>

      <div className="hover:bg-[#435658] flex justify-center text-center transition-all">
      <Link href="/products/Laptops">
      <Image src="/laptop.png" width={100} height={100} alt={"logo"} className=" "/>
      <h2 className="mr-5">แล็ปท็อป</h2>
      </Link>
      </div>

      <div className="hover:bg-[#435658] flex justify-center text-center transition-all ">
      <Link href="/products/Fragrances">
      <Image src="/fragrances.png" width={100} height={100} alt={"logo"} className=""/>
      <h2 className="">น้ำหอม</h2>
      </Link>
      </div>

      <div className="hover:bg-[#435658] flex justify-center text-center transition-all ">
      <Link href="/products/Skincare">
      <Image src="/Skincare.png" width={115} height={100} alt={"logo"} className=""/>
      <h2 className="">ผลิตภัณฑ์ความงาม</h2>
      </Link>
      </div>

      <div className="hover:bg-[#435658] flex justify-center text-center transition-all ">
      <Link href="/products/Groceries">
      <Image  src="/groceries.png" width={80} height={85} alt={"logo"} className=""/>
      <h2 className="">ของชำ</h2>
      </Link>
      </div>
      
      <div className="hover:bg-[#435658] flex justify-center text-center transition-all ">
      <Link href="/products/HomeDec">
      <Image src="/homedec.png" width={100} height={85} alt={"logo"} className=""/>
      <h2 className="">ของตกแต่งบ้าน</h2>
      </Link>
      </div>
        
      <div className="hover:bg-[#435658] flex justify-center text-center transition-all">
      <Link href="/products/Furniture">
      <Image src="/furniture.png" width={100} height={85} alt={"logo"} className=""/>
      <h2 className="">เครื่องเรือน</h2>
      </Link>
      </div>

    </div>
    
    </>
  )
}
