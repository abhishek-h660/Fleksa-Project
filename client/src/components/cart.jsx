import HomeHeader from './header'
import CartCard from './CartCard';
import './../style/cart.css'
import { useEffect, useState } from 'react';
const CartItems = () => {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        fetch(`http://localhost:8080/list_cart_items`, {
            method: "GET"
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            var sum = 0
            const products = data.map((product)=>{
                sum = sum+(product.product.price*product.quantity)
                return <CartCard _id={product.product._id} price={product.product.price} name={product.product.name} image={product.product.image} key={product.product._id} quantity={product.quantity}/>
            })
            setItems(products)
            setTotal(sum)
        })
    }, [])

    const handleBuy = () => {
        console.log("handle click")
        //Integrate Razorpay 
    }

    return(
        <div>
            <HomeHeader />
            <div className='cart-container'>
                {items}
                Total Payable Amount: ₹{total}
                <button onClick={handleBuy}>Pay</button>
            </div>
            
        </div>
    )
}

export default CartItems;