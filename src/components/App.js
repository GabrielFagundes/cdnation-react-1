import React from 'react'
import { matchPath, withRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import RecipePage from './RecipePage'
import { slugify } from '../helpers'
import { results } from '../sample_data/recipes.json'

function App({ history, location }) {
  
  const getRecipeString = () => {
    const match = matchPath(location.pathname, {
      path: "/recipe/:searchString",
      exact: true,
      strict: false
    });

    return  match ? match.params.searchString : "";
  }

  const getSearchString = () => {
    const match = matchPath(location.pathname, {
      path: "/:searchString",
      exact: true,
      strict: false
    });

    return match ? match.params.searchString : "";
  };

  const handleUrlSearchString = (event) => history.push("/" + event.target.value);
   
  const getRecipe = () => {
    const searchString = getRecipeString();
    return results.find(recipe => slugify(recipe.title) === searchString);
  }

  const searchString = getSearchString();
  const recipe = getRecipe();

    return (
      <div className="App">
          <Navbar
            searchString={searchString}
            handleUrlSearchString={handleUrlSearchString}
          />
        )/>
    
        <div className="container mt-10">
          <Route path="/" exact render={() => <Home  recipes={results}/>} />
          <Route path="/:searchString" exact render={() => <Home searchString={searchString} recipes={results}/>} />
          <Route path="/recipe/:searchString" exact render={() => <RecipePage recipe={recipe} />} />
        </div>
      </div>
    )
}

export default withRouter(App);
