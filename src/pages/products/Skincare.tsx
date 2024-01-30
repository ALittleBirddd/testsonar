import Head from "next/head"
import Image from "next/image"
import styles from "@/styles/Product.module.css"
import Link from "next/link"
import Swal from "sweetalert2"
import { useState} from "react"
import { useLocalStorage } from "usehooks-ts"

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

export async function getStaticProps(){
    const res = await fetch("https://dummyjson.com/products/category/skincare")
    const data = await res.json()
    
 
    return{
        props:{products:data.products}
    }
}

export default function Index({ products }: { products: ProductDetails[] }){
  const [data,setData] = useState<ProductDetails[]>(products)
  const [cart, setCart] = useLocalStorage<ProductDetails[]>("cart", [])
  const [count,setCount] = useLocalStorage<Count>("count",{});

  const [filteredProducts, setFilteredProducts] = useState<ProductDetails[]>(products);
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilterValue(searchValue);
    const filtered = products.filter(
        (product) =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
};

function addToCart(id: number) {
  // Find item id to get data
  const storeData = data.find((item) => item.id == id)
  console.log(storeData)
  const foundItem = cart.find((item) => item.id == id)
  console.log(foundItem)

  if (storeData && foundItem == undefined) {
      setCart([...cart, storeData])
      let co = count;
      co[id] = 1;
      setCount(co)
  } else if (storeData && foundItem != undefined) {
      let co = count;
      co[id] += 1;
      setCount(co)
  } else {
      alert("error")
  }
}
  

  function Alertsuccess(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Add successfully"
    });
  }

    return(
        <>
        <Head>
        <title>Skincare | Nonvy</title>
    </Head>

    <div className="flex justify-center">

                        <span className="from">
                            <img className="w-10 h-10 inline mr-2" src="/search-icon.jpeg" alt="search" />
                            <input className="bg-white flex-none" type="text" placeholder="Search..." value={filterValue} onChange={handleFilterChange} />
                            <button className="ml-3 px-1 py-1 text-black transition-all transform border border-black rounded-3xl hover:bg-black hover:text-gray-100">Search</button>
                        </span>


                    </div>


    <div className='flex flex-col justify-center bg-gray-100'>
  <div className='flex justify-between items-center px-20 py-5'>
    <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>รายการสินค้าหมวดหมู่ : ผลิตภัณฑ์ความงาม</h1>
  </div>
  <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
    {
      filteredProducts.map(product => (
        <div key={product.id} className='bg-white shadow-md rounded-lg px-10 py-10'>
            <Link href={'/products/'+product.id}>
          <img src={product.thumbnail} alt={product.title} className='rounded-md h-48' />
            </Link>
          <div className='mt-4'>
            <h1 className='text-lg uppercase font-bold'>{product.title}</h1>
            <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
            <p className='mt-2 text-gray-600'>${product.price}</p>
          </div>
          <div className='mt-6 flex justify-between items-center'>
            <button onClick={() => {addToCart(product.id) 
              Alertsuccess()}} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>Add to cart</button>
          </div>
        </div>
      ))
    }
  </div>
</div>
        </>
    )
}
