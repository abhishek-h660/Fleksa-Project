const Bill = (props) => {
    const products = props.bill.description.map((item) => {
        return <div>
            <div className="cart-product" key={props._id+"Bill"} id={props._id+"bill"}>
            <div className='details'>
                <div>
                    {item.product.name}
                </div>
                <div>
                    Price: ₹{item.product.price}
                </div>
                <div>
                    Quantity: {item.quantity}
                </div>
                <div>
                    Payable: ₹{item.product.price*parseInt(item.quantity)}
                </div>
            </div>
            <div  className='cart-image'>
                <img src={item.product.image} alt="unable to render"/>
            </div>
            
        </div>
            
        </div>
    })
    return(
        <div className="bill-container">
            <div className="bill-id">Order ID: {props.bill._id}</div>
            <div className="description">Description: {products}</div>
            <div className="total">Total: ₹{props.bill.total}</div>
        </div>
    )
}

export default Bill;