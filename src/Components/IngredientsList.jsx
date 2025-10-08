// export default function IngredientsList(props) {
//     const ingredientsListItems = props.ingredients.map(ingredient => (
//         <li key={ingredient}>{ingredient}</li>
//     ))
//     return (
//         <section>
//             <h2>Ingredients on hand:</h2>
//             <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
//             {props.ingredients.length > 3 && <div className="get-recipe-container">
//                 <div>
//                     <h3>Ready for a recipe?</h3>
//                     <p>Generate a recipe from your list of ingredients.</p>
//                 </div>
//                 <button onClick={props.getRecipe}>Get a recipe</button>
//             </div>}
//         </section>
//     )
// }
// src/Components/IngredientsList.jsx
import React from 'react';

export default function IngredientsList({ ingredients, getRecipe, onRemoveIngredient }) {
    
    // Check if the list is empty to prevent showing the container
    if (ingredients.length === 0) {
        return null;
    }

    return (
        <div className="glass-container ingredients-list-container">
            <h3>Your Pantry (Ingredients Added: {ingredients.length})</h3>
            
            <div className="ingredients-grid">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-tag">
                        <span>{ingredient}</span>
                        <button 
                            className="remove-btn" 
                            aria-label={`Remove ${ingredient}`}
                            onClick={() => onRemoveIngredient(index)} // Use the passed-down removal function
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={getRecipe} 
                className="get-recipe-btn"
                // Assuming you'd want a loading state here in a real app
            >
                🔥 Get Chef Claude's Recipe
            </button>
        </div>
    );
}