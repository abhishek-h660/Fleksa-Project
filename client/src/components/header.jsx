import './../style/homeHeader.css'
import SearchBox from './SearchBar';
import { Link } from 'react-router-dom';

function HomeHeader() {
    return(
        <div className="home-header">
            <div className='header-item' id='company-logo'><img src='/companyLogo.png' alt='Company logo' /></div>
            <SearchBox />
            <div className='header-item'>
                <div className='header-item-child' id="summary"><Link to='/summary'>Order Summary</Link></div>
                <div className='header-item-child' id="cart"><Link to='/cart'>Cart</Link></div>
            </div>
        </div>
    )
}

export default HomeHeader;