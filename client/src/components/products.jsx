import { useEffect, useState } from "react";    
import './../style/products.css'
import Product from "./product";

function Products() {
    
    const [products, setProducts] = useState([])
    const [skipFactor, setSkipFactor] = useState(0)
    useEffect(() => {
        const skip = skipFactor*20;
        const limit = 20;
        fetch(`http://localhost:8080/products?skip=${skip}&limit=${limit}`, {
            method: "Get"
        }).then(res => {
            return res.json();
        }).then((json) =>{
            const list = json.map((product) => {
                return (
                    <Product _id={product._id} price={product.price} name={product.name} image={product.image} key={product._id}/>
                )
            })
            setProducts(list)
        })     
    },[skipFactor])

    return(
        <div className="product-container">
            {products}
            <button id="load-more" onClick={()=>{
                setSkipFactor(skipFactor+1);
                window.scrollTo(0,0)
            }}>Load more{" >>>"}</button>
        </div>
    )
}
export default Products;