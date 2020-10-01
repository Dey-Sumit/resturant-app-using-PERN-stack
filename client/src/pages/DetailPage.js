import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';

const DetailPage = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState([]);

    const [reviews, setReviews] = useState([])

    const fetchData = async () => {
        try {
            const response = await RestaurantFinder.get(`/${id}`)
            setRestaurant(response.data.data.restaurant);
            setReviews(response.data.data.reviews)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [id])


    const updateReviews = () => {
        fetchData();
    }

    return (
        <>
            {restaurant && <div>
                <h2 className="text-center my-5">{restaurant.name}</h2>
                <h4>Average Rating : {restaurant.average_rating}| No of reviews : {restaurant.no_of_reviews} </h4>
                <div className="row">
                    {
                        reviews && reviews.map(review => <Reviews key={review.id} data={review} />)
                    }
                </div>
            </div>
            }
            <AddReview restaurant_id={restaurant.id} updateReviews={updateReviews} />

        </>
    );
};

export default DetailPage;