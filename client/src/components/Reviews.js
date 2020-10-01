import React from 'react';

const Reviews = ({ data: { name, rating, review } }) => {
    return (
        <div className="col-3 mb-3">
            <div className="card text-white bg-primary mb-3 mr-4">
                <div className="card-header d-flex justify-content-between">
                    <span>{name}</span>
                    <span>Rating : {rating}</span>
                </div>
                <div className="card-body">
                    {review}
                </div>
            </div>
        </div>
    );
};

export default Reviews;