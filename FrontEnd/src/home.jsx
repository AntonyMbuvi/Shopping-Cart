import './static/home.css';
import add from './static/photos/plus.svg';
import cartLogo from './static/photos/cart.svg';
import login from './static/photos/login.svg';
import home from './static/photos/home.svg';
import shop from './static/photos/gift.svg';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';


export default function Home(){
    const navigate = useNavigate()
    const [slideIndex, setSlideIndex] = useState(0);
    const images = [add, login, home]; 

    useEffect(() => {
        const interval = setInterval(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="homePage">
            <div className='side-bar'>
                <div className='company-foo'>
                    <h2>Cloth shop</h2>
                    <img
                        src='https://freesvg.org/storage/img/thumb/doctormo_Dring_and_Drang.png'
                        alt='logo of cloth company'
                        className='logo'
                    />
                </div>
                <div className='nav-links'>
                    <div className='link'>
                        <img src={login} alt='login icon' className='icon' />
                        <h3>Login</h3>
                    </div>
                    <div className='link' onClick={()=>navigate('/home')}>
                        <img src={home} alt='home icon' className='icon' />
                        <h3>Home</h3>
                    </div>
                    <div className='link' onClick={()=>navigate('/')}>
                        <img src={shop} alt='shop icon' className='icon' />
                        <h3>Shop</h3>
                    </div>
                    <div className='link' onClick={()=>navigate('/cart')}>
                        <img src={cartLogo} alt='Cart Icon' className='icon' />
                        <h3>Cart</h3>
                    </div>
                    <div className='link' onClick={()=>navigate('/addClothes')}>
                        <img src={add} alt='Add Clothes' className='icon' />
                        <h3>Add Clothes</h3>
                    </div>
                </div>
            </div>
            <div className="mainBar">
                <div className="slideshow-container">
                {images.map((image, index) => (
                    <div key={index} className={index === slideIndex ? 'mySlides fade' : 'mySlides'}>
                    <img src={image} style={{ width: '100%' }} alt={`Slide ${index + 1}`} className='icon'/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}