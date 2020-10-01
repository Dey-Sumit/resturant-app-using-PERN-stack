import React, { useState } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';

const AddReview = ({ restaurant_id, updateReviews }) => {
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${restaurant_id}/reviews`,
                {
                    name,
                    review,
                    rating
                }
            )
            updateReviews()
            setName("");
            setReview("");
            setRating("Rating");
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div>
            <div className="mb-4">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form row">
                        <div className="col">
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="name" />
                        </div>
                        <div className="col">
                            <input type="text" required value={review} onChange={(e) => setReview(e.target.value)} className="form-control" placeholder="review" />
                        </div>
                        <div className="col">
                            <select className="custom-select my-1 mr-sm-2" value={rating} onChange={e => setRating(e.target.value)}>
                                <option disabled>Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Review</button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;