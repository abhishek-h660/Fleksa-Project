import './../style/footer.css'
function Footer() {
    return(
        <div className="footer">
            <div className='section-1'>
                <a href='/about_us'> About Us </a>
                <a href='/contact_us'> Contact Us </a>
                <a href='/help'> Help </a>
            </div>
            <div className='section-2'>
                <div className='line'>
                </div>
                <div className='section-2-subdivision-container'>
                    <div className='section-2-subdivision-container-text-part'>
                        Contact: +91 8840956490<br/>
                        Address: 3/1917 Rampur, Bataubeer, Ramnagar, Varanasi,221008
                    </div>
                    <div className="section-2-subdivision-container-social-media">
                        <div>
                            Follow Us:
                        </div>
                        <div className='section-2-subdivision-container-social-media-icons'>
                            <a href="/facebook_link"><img src="/facebook.svg" alt="" id='facebook-icon'/></a>
                            <a href="/instagram_link"><img src="/instagram.svg" alt="" id='instagram-icon'/></a>
                            <a href="/telegram_link"><img src="/telegram.svg" alt="" id='telegram-icon'/></a>
                            <a href="/whatsapp_link"><img src="/whatsapp.svg" alt="" id='whatsapp-icon'/></a> 
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='copyright'>
                &copy; copyright 2022-2023
            </div>
            
        </div>
    )
}

export default Footer;