import Link from "next/link"
import Image from "next/image"


export default function Navbar(){
    return(
        
            
            
<nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6  shadow sm:items-baseline w-full bg-[#342619]">
  <div className="mb-2 sm:mb-0">
    <h6 className="text-4xl">Nonvy</h6>
    <a href="/"> <img className="inline" src="/shopping.png" width={80} height={80} alt="logo"/> </a>
  </div>
  <div>
    <a href="/" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Home</a>
    <a href="/about" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">About us</a>
    <a href="/products" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Prouducts</a>
    <a href="/cart"><img src="/cart.png" width={80} height={80} alt="cart" className="inline" /></a>
  </div>
</nav>
            
        
        
    )
}