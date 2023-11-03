import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './static/cloth.css'
import add from './static/photos/plus.svg';
import cartLogo from './static/photos/cart.svg';
import login from './static/photos/login.svg';
import home from './static/photos/home.svg';
import shop from './static/photos/gift.svg';

const Notification = ({ message }) => {
    return (
      <div className="notification">
        <p><i><b>{message}</b></i></p>
      </div>
    );
};

export default function Cloth ({cart, addCart}){
    const { id } = useParams();
    const [cloth, setCloth] = useState()
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    let message = 'Cloth added to cart!'

    if (window.location.href.includes('/addCart/[object%20Object]')) {
        navigate('/');
      }
    
    useEffect(() => {
        const fetchCloth = async() => {
            try {
            const res = await axios.get(`http://localhost:3000/allclothes/${id}`);
                setCloth(res.data[0]); // You should use res.data to access the response data.
            } catch (error) {
                console.error(error); // Log the error properly.
            }
        }
        fetchCloth()
    }, [])

    function addToCart(cloth) {
    const clothExists = cart.some(item => item.id === cloth.id);

    if (clothExists) {
        message = 'Item already in cart';
    } else {
        addCart([...cart, cloth]);
        message = 'Cloth added to cart!';
    }

    setShowNotification(true); // Set state to trigger the notification
    setTimeout(() => {
        setShowNotification(false); // Hide the notification after a brief delay
    }, 3000); // 3000ms = 3 seconds (adjust this delay as needed)
}


    return(
        <div className='addCart-Page'>
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
            <div className='addCart'>
                <div className='left'>
                    <div className='cloth-title'>
                        {cloth && <h2><b><i>{cloth.name}</i></b></h2>}
                    </div>
                    <div className='cloth-pic'>
                    {cloth && <img src={cloth.picture} alt='photo of cloth' className='cloth-pic' />}
                    </div>
                </div>
                <div className='right'>
                    <div className="first-half">
                        <div className='sizes'>
                            {cloth && <h3><i><b>{cloth.category} sizes</b></i></h3> }
                            {cloth && <p>{cloth.size}</p>}
                        </div>
                        <div className='brand'>
                            <h3><i><b>Brand</b></i></h3>
                            {cloth && <p>{cloth.brand}</p>}
                        </div>
                    </div>
                    <div className="second-half">
                        <div className='store'>
                            <h3><i><b>Available in the following stores:</b></i></h3>
                            {cloth && <p>{cloth.store}</p>}
                        </div>
                        <div className='price'>
                            <h3><i><b>Price</b></i></h3>
                            {cloth && <p>{cloth.price}</p>}
                        </div>
                        <button className='add-button' 
                            onClick={() => addToCart(cloth)} >
                            Add to Cart
                        </button>
                    </div>
                    <div className='add-notification'>
                        {showNotification && <Notification message={message} />}
                    </div>
                </div>
            </div>
        </div>
        
    )
}