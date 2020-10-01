import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const UpdatePage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            const { name, location, price_range } = response.data.data.restaurant;
            setName(name);
            setLocation(location);
            setPriceRange(price_range)
        }
        fetchData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        })
        console.log(response);
        history.push('/')
    }

    return (
        <div>
            <h1>Update restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">location</label>

                    <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" placeholder="location" />
                </div>
                <div className="form-group">

                    <select className="custom-select my-1 mr-sm-2" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form >
        </div >
    );
};

export default UpdatePage;