// import React from "react"
// import IngredientsList from "./Components/IngredientsList.jsx"
// import ClaudeRecipe from "./Components/ClaudeRecipe.jsx"
// import {getRecipeFromMistral} from "./ai"

// export default function MainSection() {

//     const [ingredients, setIngredients] = React.useState([])
//     const [recipe, setRecipe]=React.useState("")

//     async function getRecipe(){
//         const generatedRecipe = await getRecipeFromMistral(ingredients)
//         setRecipe(generatedRecipe)
//     }

//     function addIngredient(event) {
//         event.preventDefault();
// //         const formData = new FormData(event.target);
// //         const newIngredient = formData.get("ingredient").trim();
// //         setIngredients(prevIngredients => [...prevIngredients, newIngredient])
// //         event.target.reset();
// //     }

// //     return (
// //         <main>
// //             <form onSubmit={addIngredient} className="add-ingredient-form">
// //                 <input
// //                     type="text"
// //                     placeholder="e.g. oregano"
// //                     aria-label="Add ingredient"
// //                     name="ingredient"
// //                 />
// //                 <button type="submit">Add ingredient</button>
// //             </form>
// //             {ingredients.length > 0 && 
// //                 <IngredientsList 
// //                     ingredients = {ingredients}
// //                     getRecipe = {getRecipe}
// //                 />
// //             }

// //             {recipe && <ClaudeRecipe recipe={recipe} />}
// //         </main>
// //     )
// // }
// import React from "react"
// import IngredientsList from "./Components/IngredientsList.jsx"
// import ClaudeRecipe from "./Components/ClaudeRecipe.jsx"
// import UserRecipes from "./Components/UserRecipes.jsx" // NEW
// import { getRecipeFromMistral } from "./ai"

// export default function MainSection() {
//     const [ingredients, setIngredients] = React.useState([])
//     const [recipe, setRecipe] = React.useState("")
//     const [activeTab, setActiveTab] = React.useState('ai-chef') // NEW - Tab state

//     async function getRecipe(){
//         const generatedRecipe = await getRecipeFromMistral(ingredients)
//         setRecipe(generatedRecipe)
//     }

//     function addIngredient(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const newIngredient = formData.get("ingredient").trim();
//         if (newIngredient) {
//             setIngredients(prevIngredients => [...prevIngredients, newIngredient])
//         }
//         event.target.reset();
//     }

//     // NEW - Function to save AI-generated recipes
//     const saveAIRecipe = () => {
//         if (recipe) {
//             const savedRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]')
//             const newRecipe = {
//                 id: Date.now(),
//                 title: "AI Generated Recipe",
//                 content: recipe,
//                 ingredients: ingredients,
//                 isUserCreated: false,
//                 createdAt: new Date().toISOString()
//             }
//             const updatedRecipes = [newRecipe, ...savedRecipes]
//             localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//             alert('Recipe saved to your collection!')
//         }
//     }

//     return (
//         <main>
//             {/* NEW - Tab Navigation */}
//             <div className="tab-navigation">
//                 <button 
//                     className={activeTab === 'ai-chef' ? 'active' : ''}
//                     onClick={() => setActiveTab('ai-chef')}
//                 >
//                     🍳 AI Chef
//                 </button>
//                 <button 
//                     className={activeTab === 'my-recipes' ? 'active' : ''}
//                     onClick={() => setActiveTab('my-recipes')}
//                 >
//                     📚 My Recipes ({JSON.parse(localStorage.getItem('userRecipes') || '[]').length})
//                 </button>
//             </div>

//             {/* AI Chef Tab */}
//             {activeTab === 'ai-chef' && (
//                 <>
//                     <form onSubmit={addIngredient} className="add-ingredient-form">
//                         <input
//                             type="text"
//                             placeholder="e.g. oregano, chicken, tomatoes..."
//                             aria-label="Add ingredient"
//                             name="ingredient"
//                         />
//                         <button type="submit">Add ingredient</button>
//                     </form>
                    
//                     {ingredients.length > 0 && 
//                         <IngredientsList 
//                             ingredients={ingredients}
//                             getRecipe={getRecipe}
//                         />
//                     }

//                     {recipe && (
//                         <div className="ai-recipe-container">
//                             <div className="recipe-actions">
//                                 <button onClick={saveAIRecipe} className="save-recipe-btn">
//                                     💾 Save This Recipe
//                                 </button>
//                             </div>
//                             <ClaudeRecipe recipe={recipe} />
//                         </div>
//                     )}
//                 </>
//             )}

//             {/* My Recipes Tab */}
//             {activeTab === 'my-recipes' && (
//                 <UserRecipes />
//             )}
//         </main>
//     )
// }
//proper woriking one
import React from "react"
import IngredientsList from "./Components/IngredientsList.jsx"
import ClaudeRecipe from "./Components/ClaudeRecipe.jsx"
import UserRecipes from "./Components/UserRecipes.jsx"
import { getRecipeFromMistral } from "./ai"

export default function MainSection() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [activeTab, setActiveTab] = React.useState('ai-chef')
    const [isLoading, setIsLoading] = React.useState(false)

    async function getRecipe(){
        if (ingredients.length === 0) {
            alert('Please add some ingredients first!')
            return
        }
        
        setIsLoading(true)
        try {
            const generatedRecipe = await getRecipeFromMistral(ingredients)
            setRecipe(generatedRecipe)
        } catch (error) {
            console.error('Error generating recipe:', error)
            alert('Failed to generate recipe. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    function addIngredient(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient").trim();
        
        if (newIngredient) {
            // Check if ingredient already exists
            if (!ingredients.includes(newIngredient)) {
                setIngredients(prevIngredients => [...prevIngredients, newIngredient])
            } else {
                alert('This ingredient is already added!')
            }
        }
        event.target.reset();
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prevIngredients => 
            prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
        )
    }

    // Function to save AI-generated recipes
    const saveAIRecipe = () => {
        if (recipe) {
            const savedRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]')
            const newRecipe = {
                id: Date.now(),
                title: "AI Generated Recipe - " + new Date().toLocaleDateString(),
                content: recipe,
                ingredients: ingredients,
                isUserCreated: false,
                createdAt: new Date().toISOString(),
                type: 'ai-generated'
            }
            const updatedRecipes = [newRecipe, ...savedRecipes]
            localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
            alert('✅ Recipe saved to your collection!')
        }
    }

    // Clear all ingredients
    const clearIngredients = () => {
        setIngredients([])
        setRecipe("")
    }


    // Get recipe count for the tab badge
    const getRecipeCount = () => {
        try {
            const savedRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]')
            return savedRecipes.length
        } catch (error) {
            return 0
        }
    }

    return (
        <main>
            {/* Tab Navigation */}
            <div className="tab-navigation">
                <button 
                    className={activeTab === 'ai-chef' ? 'active' : ''}
                    onClick={() => setActiveTab('ai-chef')}
                >
                    🍳 AI Chef
                </button>
                <button 
                    className={activeTab === 'my-recipes' ? 'active' : ''}
                    onClick={() => setActiveTab('my-recipes')}
                >
                    📚 My Recipes 
                    <span className="tab-count">
                        {getRecipeCount()}
                    </span>
                </button>
            </div>

            {/* AI Chef Tab */}
            {activeTab === 'ai-chef' && (
                <div className="ai-chef-tab">
                    {/* Add Ingredient Form */}
                    <div className="glass-container">
                        <form onSubmit={addIngredient} className="add-ingredient-form">
                            <input
                                type="text"
                                placeholder="e.g., chicken, tomatoes, garlic..."
                                aria-label="Add ingredient"
                                name="ingredient"
                                required
                            />
                            <button type="submit">
                                + Add Ingredient
                            </button>
                        </form>

                        {/* Current Ingredients */}
                        {ingredients.length > 0 && (
                            <div className="current-ingredients">
                                <h3>Your Ingredients ({ingredients.length})</h3>
                                <div className="ingredients-grid">
                                    {ingredients.map((ingredient, index) => (
                                        <div key={index} className="ingredient-tag">
                                            <span>{ingredient}</span>
                                            <button 
                                                type="button"
                                                className="remove-btn"
                                                onClick={() => removeIngredient(ingredient)}
                                                title="Remove ingredient"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="ingredients-actions">
                                    <button 
                                        onClick={clearIngredients}
                                        className="clear-btn"
                                    >
                                        🗑️ Clear All
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Get Recipe Button */}
                    {ingredients.length > 0 && (
                        <div className="get-recipe-section">
                            <button 
                                onClick={getRecipe}
                                disabled={isLoading}
                                className="get-recipe-btn"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="loading-spinner"></div>
                                        Generating Recipe...
                                    </>
                                ) : (
                                    '🧑‍🍳 Generate Recipe'
                                )}
                            </button>
                        </div>
                    )}

                    {/* Generated Recipe */}
                    {recipe && (
                        <div className="recipe-container">
                            <div className="recipe-actions">
                                <button onClick={saveAIRecipe} className="save-recipe-btn">
                                    💾 Save to My Recipes
                                </button>
                                <button 
                                    onClick={() => {
                                        setRecipe("")
                                        setIngredients([])
                                    }} 
                                    className="clear-btn"
                                >
                                    🆕 New Recipe
                                </button>
                            </div>
                            <ClaudeRecipe recipe={recipe} />
                        </div>
                    )}
                </div>
            )}

            {/* My Recipes Tab */}
            {activeTab === 'my-recipes' && (
                <UserRecipes />
            )}
        </main>
    )
}
