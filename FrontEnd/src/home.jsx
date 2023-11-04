import './static/home.css';
import axios from 'axios';
import add from './static/photos/plus.svg';
import cartLogo from './static/photos/cart.svg';
import login from './static/photos/login.svg';
import home from './static/photos/home.svg';
import shop from './static/photos/gift.svg';
import bags from './static/photos/bags.jpg';
import bags2 from './static/photos/bags2.jpg';
import nix from './static/photos/nix.jpg';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import * as React from 'react';


export default function Home(){
    const navigate = useNavigate()
    const images = ['https://shorturl.at/dyzHL','https://shorturl.at/TYZ79','https://shorturl.at/glvx6','https://shorturl.at/cquJL', 'https://shorturl.at/bnBTY', 'https://rb.gy/icplq3', 'https://rb.gy/xplybs', 'https://rb.gy/p5xy6y']
    
    
    const [index, setIndex] = useState(0);
    const image = images[index];
    const image1 = images[(index + 1) % images.length ];
    const image2 = images[(index + 2) % images.length ];
    const image3 = images[(index + 3) % images.length ];


    const [pictures, setPictures] = useState([])
    useEffect(() => {
        const fetchAllClothes = async () => {
        try {
            const res = await axios.get('http://localhost:3000/allclothes');
            const objects = res.data;
            const pictures = objects.map(cloth => cloth.picture);
            setPictures(pictures)

        } catch (err) {
            console.log('THERE WAS AN ERROR GETTING ALL CLOTHES: ', err);
        }
        };
        fetchAllClothes();
    }, []);

    const [pictureIndex, setPitureIndex] = useState(0);

    const next = () => {
        setIndex((index + 1) % images.length);
        setPitureIndex((pictureIndex + 1) % pictures.length);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);

        return () => clearInterval(interval);
    }, [index]);

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
                <div className='slidingPhotos'>
                    <div className='leftImage'>
                        <div>
                            <img src={image1} alt="main photo" className='mainPhoto' />
                        </div>
                        <div>
                            <img src={image2} alt="main photo" className='mainPhoto' />
                        </div>
                    </div>
                    <div className='center'>
                        <h1><i><b>CLOTH SHOP</b></i></h1>
                    </div>
                    <div className='rightImage'>
                        <div>
                            <img src={image3} alt="main photo" className='mainPhoto' />
                        </div>
                        <div >
                            <img src={image}  alt={'logo images'} className='mainPhoto'/>
                        </div>
                    </div>
                </div>
                <div className='gifDiv'>
                    <h2 className='express'><i><b>Come express yourself through the clothes you wear !!!</b></i></h2>
                    <img src={bags} alt="image of shopping bags" className='cloth-pic' />
                </div>
                <div className='moreClothes'>
                    <img src={nix} alt="image of clothes" className='cloth-pic' />
                    <img src={bags2} alt="image of shopping bags" className='cloth-pic' />
                </div>
                <div className='allclothess'>
                    {pictures && <img src={pictures[pictureIndex]} alt='trial photo' className='cloth-pic'/>}
                </div>
                
            </div>
        </div>
    )
}