
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