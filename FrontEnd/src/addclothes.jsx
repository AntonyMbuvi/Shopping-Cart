import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './static/addclothes.css'
import cartLogo from './static/photos/cart.svg';
import login from './static/photos/login.svg';
import home from './static/photos/home.svg';
import shop from './static/photos/gift.svg';
import add from './static/photos/plus.svg';

export default function AddClothes (){
    const[form, setForm] = useState({
        name : '',
        category : '',
        brand : '',
        store : '',
        size : '',
        picture : '',
        price : '',
    });

    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
    
    const handleClick = async (e) => {
        e.preventDefault();
      
        const formSubmission = e.target;
        const formData = new FormData(formSubmission);
        const submission = {};
      
        formData.forEach((value, key) => {
          submission[key] = value === '' ? null : value;
        });
        try {
          await axios.post('http://localhost:3000/addClothing', submission);
          navigate('/');
          setForm({
            name: '',
            category: '',
            brand: '',
            store: '',
            size: '',
            picture: '',
            price: '',
          });
        } catch (error) {
          console.error('Error while making the POST request:', error);
          setError(error);
        }
      };
      
    
    return(
        <div className='add-clothes'>
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
          <div className='formPage'>
            <h1>ADD NEW Cloth</h1>
            <form onSubmit={handleClick} >
                <label className='formLabel' htmlFor="name">
                Input cloth name : 
                    <input type='text' name='name' id='name'
                            placeholder='Cloth name' />
                </label>
                <label className='formLabel' htmlFor="category">Select cloth category:</label>
                <select name='category' id='category' >
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
                <label className='formLabel' htmlFor="brand">
                    Input cloth brand : 
                    <input type='text' name='brand' id='brand'
                            placeholder='Cloth brand' />
                </label>
                <label className='formLabel' htmlFor="store">
                    Input cloth store : 
                    <input type='text' name='store' id='store'
                            placeholder='Cloth store' />
                </label>
                <label className='formLabel' htmlFor="size">
                    Input cloth size : 
                    <input type='text' name='size' id='size'
                            placeholder='Cloth size' />
                </label>
                <label className='formLabel' htmlFor="picture">
                    Input cloth picture : 
                    <input type='text' name='picture' id='picture'
                            placeholder='Link to picture' />
                </label>
                <label className='formLabel' htmlFor="price">
                    Input cloth price : 
                    <input type='number' name='price' id='price'
                            placeholder='Cloth price' />
                </label>
                <button type='submit' >Submit</button>
            </form>

            {error && <p>{error.message || 'Something went wrong'}</p>}


          </div>
        </div>
        
    )
}