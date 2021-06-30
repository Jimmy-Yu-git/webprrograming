import React from "react";
import PropTypes from 'prop-types';
import { EmptyStar, FullStar,HalfStar } from './icons';

const Ratings = (props) => {

    const createStars = () =>{

        let stars = [];
        let ratingsValue = props.ratings;
        const flooredRatingsValue = Math.floor(ratingsValue);
        const remainingRatingsValue = (ratingsValue-flooredRatingsValue).toFixed(1);
        const defaultCount = remainingRatingsValue > 0 ? 4 : 5;
        const remainingRatings = defaultCount - flooredRatingsValue;

        for(let i =0; i < flooredRatingsValue ; i++){
            stars.push(<span ><FullStar colors='red'/></span>);
        }
        if(remainingRatingsValue > 0){
            stars.push(<span ><HalfStar /></span>);
        }
        if(remainingRatings){
            for(let k =0; k < remainingRatings; k++){
                stars.push(<span ><EmptyStar /></span>);
            }
        }
        return stars;
    }

    return (
        <div className={`${props.containerClassName}`} title={props.ratings.star_ratings}>
            { createStars() }
            <span className='total-rating-votes'>({props.command})</span>
        </div>
    );

}

Ratings.prototypes = {
    ratings: PropTypes.object.isRequired,
    containerClassName: PropTypes.string,
    fullStarIcon: PropTypes.string,
    halfStarIcon: PropTypes.string,
    emptyStarIcon: PropTypes.string,
}

export default Ratings;