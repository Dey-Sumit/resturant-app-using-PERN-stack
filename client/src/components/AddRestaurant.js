import React, { useContext, useState } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
    const { addRestaurant } = useContext(RestaurantContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            })
            console.log(response);
            addRestaurant(response?.data?.restaurant)
            setName("");
            setLocation("");
            setPriceRange("Price Range");
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <div className="mb-4">
                <form onSubmit={handleSubmit}>
                    <div className="form row">
                        <div className="col">
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="name" />
                        </div>
                        <div className="col">
                            <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" placeholder="location" />
                        </div>
                        <div className="col">
                            <select className="custom-select my-1 mr-sm-2" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                                <option disabled>Price Range</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurant;