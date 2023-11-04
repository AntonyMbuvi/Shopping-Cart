import React, { useState, useEffect } from 'react';
import './static/cart.css';
import add from './static/photos/plus.svg';
import cartLogo from './static/photos/cart.svg';
import login from './static/photos/login.svg';
import home from './static/photos/home.svg';
import shop from './static/photos/gift.svg';
import { useNavigate } from 'react-router-dom';

export default function Cart(props) {
    const { cart } = props;
    const { addCart } = props;
    const [totalCost, setTotalCost] = useState(0);

    const navigate = useNavigate();

    const handlePaxChange = (id, newPax) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, pax: newPax };
            }
            return item;
        });
        addCart(updatedCart);
    };

    let totalItemsPrice = 0;

    if (cart && Array.isArray(cart)) {
        cart.forEach(cloth => {
            totalItemsPrice += cloth.price * (cloth.pax || 1);
        });
    }

    useEffect(() => {
        let totalItemsPrice = 0;

        if (cart && Array.isArray(cart)) {
            cart.forEach(cloth => {
                totalItemsPrice += cloth.price * (cloth.pax || 1);
            });
        }

        setTotalCost(totalItemsPrice);
    }, [cart]);
    function removeItem(id) {
        const updatedCart = cart.filter(item => item.id !== id);
        addCart(updatedCart);
    }

    return (
        <div className='cart-page'>
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
            <div className='cart-div'>
                <h2 className='cart-header'>The cart is below with the following items</h2>
                {cart && Array.isArray(cart) && cart.map((cloth) => (
                    <div key={cloth.id} className="cart-item">
                        <div>
                            <img src={cloth.picture} alt="image of cloth" className="cloth-pic" />
                        </div>
                        <div>
                            <p>{cloth.name}</p>
                        </div>
                        <div className='priceMambos'>
                            <div>
                                <p>Price: {cloth.price}</p>
                            </div>
                            <div>
                                <input
                                    className='paxInput'
                                    type="number"
                                    value={cloth.pax || 1}
                                    onChange={(e) => handlePaxChange(cloth.id, e.target.value)}
                                />
                            </div>
                            <div>
                                <p>Total Price: {cloth.price * (cloth.pax || 1)}</p>
                            </div>
                        </div>
                        
                        <div>
                            <button onClick={() => removeItem(cloth.id)}>Remove item</button>
                        </div>
                    </div>
                ))}
                <div className='cart-price'>
                    <h2>Total Price: {totalCost}</h2>
                    <button className='checkout'>CHECKOUT</button>
                </div>
            </div>
        </div>
    );
}
