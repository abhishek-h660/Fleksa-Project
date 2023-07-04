import { useState } from 'react';
import ReactDOM from 'react-dom';
import './../style/products.css'
const Product = (props) => {
    const [popup, setPopup] = useState(false)
    const openPopup=(id)=>{
        //console.log("Clicked ", id)
        setPopup(!popup)
    }
    

    const handleAddToCart = (product) => {
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
            console.log(data)
        })
    }
    

    return(
        <>
            <div className="product" key={props._id} onClick={()=>{openPopup(props._id)}} id={props._id}>
                <img src={props.image} alt="unable to render"/>
                {props.name}<br></br>
                Price: ₹{props.price}
            </div>
            {popup &&
                ReactDOM.createPortal(
                    <div className="product-popup" onClick={()=>{openPopup(props._id)}}>
                        <img src={props.image} alt="unable to render"/>
                        <div className='product-popup-text-part'>
                            <div>{props.name}</div>
                            <div>Price: ₹{props.price}</div>
                        </div>
                        <div className='product-popup-button-part'>
                            <button onClick={()=>{handleAddToCart(props)}}> Add To Cart</button>
                        </div>

                       
                    </div>,
                    document.body
                )
            }
        </>
        
    )
}

export default Product;