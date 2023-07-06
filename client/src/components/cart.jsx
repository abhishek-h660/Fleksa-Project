import HomeHeader from './header'
import CartCard from './CartCard';
import './../style/cart.css'
import { useEffect, useState } from 'react';
import axios from "axios";

const CartItems = () => {
    const [items, setItems] = useState([])
    const [pdts, setPdts] = useState([])
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
             axios.post(url, {}).then(() => {
                var des = ""
                const data = {
                    "description": pdts,
                    "total":total
                }
                fetch(`http://localhost:8080/add_summary`, {
                    method:'post',
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(data)
                }).then(res => {
                    return res.json()
                }).then(d => {
                    console.log("added to summary", d)
                    fetch(`http://localhost:8080/remove_all_cart_item`, {
                        method:'delete'
                    }).then(res => {
                        return res.json()
                    }).then(result => {
                        console.log(result)
                        setCartChange(!cartChange)
                    })
                })
             })
             //console.log("from here",captureResponse.data);
             
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
                "price": product.price,
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
                "price": product.price,
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
            setPdts(data)
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
            {total>0 && <div className='cart-container'>
                {items}
                Total Payable Amount: ₹{total}
                <button className="pay-button" onClick={paymentHandler}>Pay</button>
            </div>}
            {total==0 && <div>Cart is Empty</div>}
        </div>
    )
}

export default CartItems;