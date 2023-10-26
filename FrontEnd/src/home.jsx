import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './static/home.css'
import add from './static/photos/plus.svg';
import cart from './static/photos/cart.svg'
import login from './static/photos/login.svg'
import home from './static/photos/home.svg'
import shop from './static/photos/gift.svg'



export default function Home(){
    const [clothes, setClothes] = useState([]);
    useEffect(() => {
        const fetchAllClothes = async() => {
            try{
                const res = await axios.get('http://localhost:3000/allclothes')
                setClothes(res.data);

            }
            catch(err){
                console.log('THERE WAS AN ERROR GETTING ALL CLOTHES : ', err)
            }
        }
        fetchAllClothes();
    }, []);

    return(
        <div className='home'>
            <div className='side-bar'>
                <div className='company-foo'>
                    <h2>Cloth shop</h2>
                    <img src="https://freesvg.org/storage/img/thumb/doctormo_Dring_and_Drang.png" alt="logo of cloth company" className='logo' />
                </div>
                <div className='nav-links'>
                    <div className='link'>
                        <img src={login} alt="login icon" className='icon'/>
                        <h3>Login</h3>
                    </div>
                    <div className='link'>
                        <img src={home} alt="home icon" className='icon' />
                        <h3>Home</h3>
                    </div>
                    <div className='link'>
                        <img src={shop} alt="shop icon" className='icon' />
                        <h3>Shop</h3>
                    </div>
                    <div className='link'>
                        <img src={cart} alt="Cart Icon" className='icon'/>
                        <h3>Cart</h3>
                    </div>
                    <div className='link'>
                        <img src={add} alt="Add Clothes" className='icon'/>
                        <Link to='/addClothes'>Add Clothes</Link>
                    </div>
                </div>
            </div>
            <div className='clothes'>
                {clothes.map((cloth) => (
                    <div key={cloth.id} className='cloth'>
                        <img src={cloth.picture} alt="image of cloth" />
                        <div className='cloth-text'>
                            <h3>{cloth.name}</h3>
                            <p>KES: {cloth.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}