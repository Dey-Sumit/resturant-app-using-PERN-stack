import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import { useHistory } from 'react-router-dom'
const RestaurantList = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext)
    const history = useHistory();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [setRestaurants])

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}`);

    }

    const handleRestaurantSelect = (id) => {
        console.log("clicked");
        history.push(`/restaurants/${id}/detail`)
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant =>
                        <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{restaurant.average_rating ? restaurant.average_rating : 'Not Rated'}</td>
                            <td><button className="btn btn-warning" onClick={(e) => handleUpdate(e, restaurant.id)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={(e) => handleDelete(e, restaurant.id)}>Delete</button></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;