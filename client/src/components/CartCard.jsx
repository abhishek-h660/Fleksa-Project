const CartCard = (props) => {

    return(
        <div className="cart-product" key={props._id} id={props._id}>
            <div className='details'>
                <div>
                    {props.name}
                </div>
                <div>
                    Price: ₹{props.price}
                </div>
                <div>
                    Quantity: {props.quantity} <button className="quantity-button" onClick={()=>{props.addHandler(props)}}>+</button> <button className="quantity-button" onClick={()=>{props.removeHandler(props)}}>-</button>
                </div>
                <div>
                    Payable: ₹{props.price*parseInt(props.quantity)}
                </div>
            </div>
            <div  className='cart-image'>
                <img src={props.image} alt="unable to render"/>
            </div>
            
        </div>
    )
}

export default CartCard;