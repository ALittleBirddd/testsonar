import styles from "@/styles/About.module.css"
import Image from "../../node_modules/next/image"
import Head from "../../node_modules/next/head"
import { useLocalStorage } from "../../node_modules/usehooks-ts/dist/esm/index"
import Link from "../../node_modules/next/link"
import Swal from "sweetalert2"
import { useState, useEffect } from "react"

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products?limit=35")
  const data = await res.json()


  return {
    props: { products: data.products }
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

export default function Cart({ products }: { products: ProductDetails[] }) {
  const [data, setData] = useState<ProductDetails[]>(products)
  // const [id, setId] = useState<number>(0);
  const [cart, setCart] = useLocalStorage<ProductDetails[]>("cart", [])
  //const [temp, setTemp] = useState<any>([]);
  const [total, setTotal] = useState(0)

  const [count, setCount] = useLocalStorage<Count>("count", {});
  const [isClient, setIsclient] = useState<boolean>(false)

  useEffect(() => {

    setIsclient(true)

  },[])

  useEffect(() => {
setTotal(
    cart.reduce((a, b) => a + b.price * count[b.id], 0)
    )
  },[count])

  

  async function calTotal(){
    setTotal(0)
    cart.forEach(item => { 
      setTotal((count[item.id]*item.price)+total)
      
      
    });
  }



  // useEffect(() => {

  //     const count: Count = {};
  //     pro.forEach((item) => {
  //         if (count[item.id]) {
  //             count[item.id] += 1;

  //             setTotal(item.price+total)
  //         } else {
  //             count[item.id] = 1;
  //             setTotal(item.price+total)
  //         }
  //     });

  //     setCount(count);

  // }, [pro])

  // useEffect(() => {
  //     // data.map(item => item.id))                           [1,1,2,3,4]
  //     // new Set(data.map(item => item.id))                   1,2,3,4
  //     // Array.from(new Set(data.map(item => item.id)))       [1,2,3,4]
  //     const uniqueData = Array.from(new Set(pro.map(item => item.id))) //   -> Set([1,1,2,3,4]) -> 1,2,3,4
  //         .map(id => {
  //             return pro.find(item => item.id === id); // 1 -> { id: 1, name: "a" }, 2 -> { id: 2, name: "b" }
  //         }); // [1,2,3,4] -> [{ id: 1, name: "a" },{ id: 2, name: "b" } ... ]

  //     console.log(uniqueData)
  //     setTemp(uniqueData);
  // }, [pro]);


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

  function minusToCart(id: number){
    let co = count
    if (count[id] > 1){
      co[id] -= 1
    }
    setCount(co)
  }

  function removeToCart(id: number){
    const newData = cart.filter((item) => item.id !== id);

         setCart(newData);
         
         let co = count
         delete co[id]
         setCount(co)
  }



  // function handleDelete(id: number) {
  //     //console.log("delete", id);

  //     const newData = pro.filter((item) => item.id !== id);
  //     // console.log("newData", newData);
  //     setPro(newData);
  //   }

  //   function Addtocart(id: number) {
  //     //console.log("delete", id);

  //     const newData = pro.filter((item) => item.id === id);
  //     // console.log("newData", newData);
  //     setPro(newData);
  //   }

  function Isconfirm() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!"
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cleared!",
          text: "Your product has been cleared.",
          icon: "success"

        });
        setCart([]);
      }
    });
  }


  return (
    <>

      <Head>
        <title>Cart | Nonvy</title>
      </Head>
      {isClient && ( 
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
          
        </div>

        <div className="mt-8">
          {

            cart.map((product: ProductDetails) => (
              <div key={product.id} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                <div className="flex-shrink-0">
                  <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-cover" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h2 className="text-lg font-bold">{product.title}</h2>
                  <p className="mt-2 text-gray-600">{product.description.slice(0, 40)}...</p>
                  <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">Quantity:</span>
                    <div className="flex items-center">
                      <button onClick={() => minusToCart(product.id)} className="bg-gray-200 rounded-l-lg px-2 py-1" >-</button>
                      <span className="mx-2 text-gray-600">{count[product.id]}</span>
                      <button onClick={() => addToCart(product.id)
                      } className="bg-gray-200 rounded-r-lg px-2 py-1" >+</button>
                    </div>
                    <span className="ml-auto font-bold">${product.price}</span>
                    <button onClick={() => removeToCart(product.id)} className="ml-auto py-2 px-4 bg-black hover:bg-gray-800 text-white rounded-lg items-end">Remove</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <button disabled={cart.length == 0 ? true : false} onClick={() => Isconfirm()} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-8">Clear</button>

        <div className="flex justify-end items-center mt-8">

          <span className="text-gray-600 mr-4">Subtotal:</span>
          <span className="text-xl font-bold">${total}</span>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <Link href={"/getpaid/"+total}>
          <button disabled={cart.length == 0 ? true : false} className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Checkout</button>
          </Link>
        </div>
        
      </div>
      )}
    </>
  )
}