import HomeHeader from './header'
import CartCard from './CartCard';
import './../style/cart.css'
import { useEffect, useState } from 'react';
import axios from "axios";

const CartItems = () => {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [cartChange, setCartChange] = useState(false)

    const paymentHandler = async (e) => {
        const API_URL = 'http://localhost:8080/'
        e.preventDefault();
        const orderUrl = `${API_URL}order/${total}`;
        const response = await axios.get(orderUrl);
        const { data } = response;
        const options = {
          key: process.env.RAZOR_PAY_KEY_ID,
          name: "Fleksa",
          description: "Test Payment. No actual payment",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}/${total}`;
             const captureResponse = await axios.post(url, {})
             console.log(captureResponse.data);
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleAdd = (product)=>{
        const reqBody = {
            "user_id":product._id,
            "product":{
                "_id":product._id,
                "price": 1000,
                "name": product.name,
                "image": product.image,
            },
            "quantity":1
        };
        fetch(`http://localhost:8080/add_to_cart`, {
            method:"post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody),
            mode:"cors",
        }).then(res => {
            return res.json()
        }).then(data => {
            setCartChange(!cartChange)
            console.log(data)
        })
    }
   
    const handleDec = (product) => {
        const reqBody = {
            "user_id":product._id,
            "product":{
                "_id":product._id,
                "price": 1000,
                "name": product.name,
                "image": product.image,
            },
            "quantity":1
        };
        fetch(`http://localhost:8080/remove_cart_item`, {
            method:"delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody),
            mode:"cors",
        }).then(res => {
            return res.json()
        }).then(data => {
            setCartChange(!cartChange)
            console.log(data)
        })
    }

    
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
                return <CartCard _id={product.product._id} price={product.product.price} name={product.product.name} image={product.product.image} key={product.product._id} quantity={product.quantity} addHandler={handleAdd} removeHandler={handleDec}/>
            })
            setItems(products)
            setTotal(sum)
        })
    }, [cartChange])

    return(
        <div>
            <HomeHeader />
            <div className='cart-container'>
                {items}
                Total Payable Amount: ₹{total}
                <button className="pay-button" onClick={paymentHandler}>Pay</button>
            </div>
            
        </div>
    )
}

export default CartItems;