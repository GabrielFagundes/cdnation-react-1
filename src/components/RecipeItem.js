import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../helpers";
import PropTypes from "prop-types";

const RecipeItem = ({ ingredients = '', thumbnail = '', title = '', searchString = '' }) => {

    const getHighlightedText = (highlight = '', string = '') => {
        const splittedString = string.split(new RegExp(`(${highlight})`, 'gi'));
        return <span>{
            splittedString.map((part, idx) => part.toLowerCase() === highlight.toLowerCase() ? <mark key={idx}>{part}</mark> : part)
        }</span>;
    }

    return (
        <div className="col-sm-3 mt-4">
            <Link to={`/recipe/${slugify(title)}`}>
                <div className="card">
                    <img className="card-img-top img-fluid" src={thumbnail} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">
                            {getHighlightedText(searchString, title)}
                        </h5>
                        <p className="card-text">
                            <strong>Ingredients: </strong>
                            {getHighlightedText(searchString, ingredients)}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

RecipeItem.propTypes = {
    ingredients: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    searchString: PropTypes.string
};

export default RecipeItem;