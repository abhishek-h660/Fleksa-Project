import { useState } from "react"
import './../style/slide.css'

function Slide() {
    const imageUrls = ["https://img.freepik.com/free-photo/dark-haired-woman-with-red-lipstick-smiles-leans-stand-with-clothes-holds-package-pink-background_197531-17609.jpg", "https://media.istockphoto.com/id/653003428/photo/fashionable-clothes-in-a-boutique-store-in-london.jpg?s=612x612&w=0&k=20&c=UafU4a4xSbepJow4kvNu0q-LD4hFUoli7q3fvwkp79s=", "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?cs=srgb&dl=pexels-kai-pilger-996329.jpg&fm=jpg", "https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"];
    const [imageCount, setImageCount] = useState(0);
    setTimeout(()=>{
        if(imageCount+2 >= imageUrls.length-1) {
            setImageCount(0);
        }else{
            setImageCount(imageCount+1);
        }
    }, 3000);
    return(
        <div className="slide-bar">
            <img src={imageUrls[imageCount]} id="slide-image" alt="nothing to show"/>
            <img src={imageUrls[imageCount+1]} id="slide-image" alt="nothing to show"/>
            <img src={imageUrls[imageCount+2]} id="slide-image" alt="nothing to show"/>
        </div>
    )
}
export default Slide;