import React, { useState, createContext } from 'react';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
    const [restaurants, setRestaurants] = useState([])

    const addRestaurant = (restaurant) => {
        console.log(restaurant);
        setRestaurants([...restaurants, restaurant]);
    }

    return (
        <RestaurantContext.Provider value={{ restaurants, setRestaurants, addRestaurant }}>
            {props.children}
        </RestaurantContext.Provider>
    )
}