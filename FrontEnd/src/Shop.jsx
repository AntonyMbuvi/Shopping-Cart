import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './static/shop.css';
import add from './static/photos/plus.svg';
import cartLogo from './static/photos/cart.svg';
import login from './static/photos/login.svg';
import home from './static/photos/home.svg';
import shop from './static/photos/gift.svg';
import filter from './static/photos/filter.svg';
import grid from './static/photos/grid.svg';
import stack from './static/photos/stack.svg';

export default function Shop() {

    const [clothes, setClothes] = useState([]);
    const [categoryS, setCategory] = useState('all');
    const [filterText, setFilterText] = useState('');
    const navigate = useNavigate()

    

    useEffect(() => {
        const fetchAllClothes = async () => {
        try {
            const res = await axios.get('http://localhost:3000/allclothes');
            setClothes(res.data);
        } catch (err) {
            console.log('THERE WAS AN ERROR GETTING ALL CLOTHES: ', err);
        }
        };
        fetchAllClothes();
    }, []);

    // Organizes the products into objects
    const clothesByCategory = {};
    clothes.forEach((cloth) => {
        const { category } = cloth;
        if (!clothesByCategory[category]) {
        clothesByCategory[category] = [];
        }
        clothesByCategory[category].push(cloth);
    });

    function handleCatChange(e) {
        setCategory(e.target.value);
    }

    return (
        <div className='home'>
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
            <div className='main-shop'>
                <div className='search-bar'>
                    <div className='page-layout-icons'>
                        <img src={stack} alt='stack icon' className='icon' />
                        <img src={grid} alt='grid icon' className='icon' />
                    </div>
                    <input
                        type='text'
                        name='search'
                        placeholder='Search'
                        className='search-input'
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <img src={filter} alt='filter icon' className='icon' />
                    <select
                        name='category'
                        id='category'
                        className='search-category'
                        onChange={handleCatChange}
                        value={categoryS}
                    >
                        <option value='all'>All Categories</option>
                        <option value='T-shirts'>T-shirts</option>
                        <option value='Trousers'>Trousers</option>
                        <option value='Hats'>Hats</option>
                        <option value='Shoes'>Shoes</option>
                        <option value='Glasses'>Glasses</option>
                        <option value='Socks'>Socks</option>
                        <option value='Sweaters'>Sweaters</option>
                        <option value='Shorts'>Shorts</option>
                        <option value='Shirts'>Shirts</option>
                    </select>
                </div>

                <div className="clothes">
                    {categoryS === 'all' ? (
                        Object.keys(clothesByCategory).map(category => (
                            <div key={category} className="category">
                                <h2>{category}</h2>
                                <div className="categorical-clothes">
                                    {clothesByCategory[category]
                                    .filter(cloth => cloth.name.toLowerCase().includes(filterText.toLowerCase()))
                                    .map(filteredCloth => (
                                        <div key={filteredCloth.id} className="cloth" 
                                            onClick={() => navigate(`/addCart/${filteredCloth.id}`)} >
                                            <img src={filteredCloth.picture} alt="image of cloth" className="cloth-pic" />
                                            <div className="cloth-text">
                                                <h3>{filteredCloth.name}</h3>
                                                <p>KES: {filteredCloth.price}</p>
                                            </div> 
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="categorical-clothes">
                            {Array.isArray(clothesByCategory[categoryS]) && clothesByCategory[categoryS].length > 0 ? (
                            clothesByCategory[categoryS]
                                .filter(cloth => cloth.name.toLowerCase().includes(filterText.toLowerCase()))
                                .map(filteredCloth => (
                                <div key={filteredCloth.id} className="cloth"
                                    onClick={() => navigate(`/addCart/${filteredCloth.id}`)}>
                                    <img src={filteredCloth.picture} alt="image of cloth" className="cloth-pic" />
                                    <div className="cloth-text">
                                        <h3>{filteredCloth.name}</h3>
                                        <p>KES: {filteredCloth.price}</p>
                                    </div>                         
                                </div>
                                ))
                            ) : (
                                <h2>No items found in this category</h2>
                            )}
                        </div>
                        )}
                </div>
            </div>
        </div>
    );
    }
