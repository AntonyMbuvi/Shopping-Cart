import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        <>
            <div className='side-bar'>
                <h2>Cloth shop</h2>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWDX0ufPob0oO9pDwxe8MA7xrpvsyOUi3CQ&usqp=CAU" alt="logo of cloth company" className='logo' />
                <div className='nav-links'></div>
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
            <Link to='/addClothes'>Add Clothes</Link>
        </>
    )
}