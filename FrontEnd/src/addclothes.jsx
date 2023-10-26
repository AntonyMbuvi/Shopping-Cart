import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

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
        console.log(submission)
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
    )
}