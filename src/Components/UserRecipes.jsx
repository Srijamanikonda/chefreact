
import React from "react"
import RecipeForm from "./RecipeForm.jsx"
import RecipeCard from "./RecipeCard.jsx"

export default function UserRecipes() {
    const [userRecipes, setUserRecipes] = React.useState([])
    const [showRecipeForm, setShowRecipeForm] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [filter, setFilter] = React.useState("all")

    // Load recipes from localStorage
    React.useEffect(() => {
        loadRecipes()
    }, [])

    const loadRecipes = () => {
        try {
            const savedRecipes = localStorage.getItem('userRecipes')
            console.log("Loaded from localStorage:", savedRecipes)
            if (savedRecipes) {
                const parsedRecipes = JSON.parse(savedRecipes)
                setUserRecipes(Array.isArray(parsedRecipes) ? parsedRecipes : [])
            } else {
                setUserRecipes([])
            }
        } catch (error) {
            console.error("Error loading recipes:", error)
            setUserRecipes([])
        }
    }

    const saveRecipe = (recipeData) => {
        console.log("Saving recipe:", recipeData)
        
        try {
            const newRecipe = {
                id: Date.now(),
                title: recipeData.title || "Untitled Recipe",
                ingredients: recipeData.ingredients || [],
                instructions: recipeData.instructions || [],
                prepTime: recipeData.prepTime || "",
                cookTime: recipeData.cookTime || "",
                servings: recipeData.servings || "",
                difficulty: recipeData.difficulty || "Easy",
                createdAt: new Date().toISOString(),
                isUserCreated: true
            }
            
            const updatedRecipes = [newRecipe, ...userRecipes]
            setUserRecipes(updatedRecipes)
            localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
            setShowRecipeForm(false)
            
            console.log("Recipe saved successfully!")
            alert('✅ Recipe saved successfully!')
        } catch (error) {
            console.error("Error saving recipe:", error)
            alert('❌ Failed to save recipe. Please try again.')
        }
    }

    const deleteRecipe = (recipeId) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const updatedRecipes = userRecipes.filter(recipe => recipe.id !== recipeId)
                setUserRecipes(updatedRecipes)
                localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
                alert('🗑️ Recipe deleted!')
            } catch (error) {
                console.error("Error deleting recipe:", error)
                alert('❌ Failed to delete recipe.')
            }
        }
    }

    const filteredRecipes = userRecipes.filter(recipe => {
        const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.ingredients?.some(ing => 
                                ing.toLowerCase().includes(searchTerm.toLowerCase())
                            ) ||
                            recipe.instructions?.some(inst => 
                                inst.toLowerCase().includes(searchTerm.toLowerCase())
                            )
        
        const matchesFilter = filter === "all" || 
                            (filter === "user" && recipe.isUserCreated) ||
                            (filter === "ai" && !recipe.isUserCreated)
        
        return matchesSearch && matchesFilter
    })

    return (
        <div className="user-recipes-section">
            <div className="section-header">
                <h2>My Recipe Collection</h2>
                <button 
                    className="add-recipe-btn"
                    onClick={() => setShowRecipeForm(true)}
                >
                    + Add New Recipe
                </button>
            </div>

            {/* Search and Filter */}
            {userRecipes.length > 0 && (
                <div className="search-filter-bar">
                    <input
                        type="text"
                        placeholder="🔍 Search recipes by name, ingredients, or instructions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Recipes</option>
                        <option value="user">My Recipes</option>
                        <option value="ai">AI Recipes</option>
                    </select>
                </div>
            )}
            
            {showRecipeForm && (
                <RecipeForm 
                    onSave={saveRecipe}
                    onCancel={() => setShowRecipeForm(false)}
                />
            )}
            
            {filteredRecipes.length === 0 ? (
                <div className="empty-state">
                    {userRecipes.length === 0 ? (
                        <>
                            <h3>No recipes yet</h3>
                            <p>Create your first recipe or generate one with AI Chef!</p>
                            <button 
                                className="add-recipe-btn"
                                onClick={() => setShowRecipeForm(true)}
                                style={{marginTop: '1rem'}}
                            >
                                + Create Your First Recipe
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>No recipes found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                            <button 
                                className="clear-search-btn"
                                onClick={() => {
                                    setSearchTerm("")
                                    setFilter("all")
                                }}
                                style={{
                                    marginTop: '1rem',
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear Search
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div className="recipes-stats">
                        Showing {filteredRecipes.length} of {userRecipes.length} recipes
                    </div>
                    <div className="recipes-grid">
                        {filteredRecipes.map(recipe => (
                            <RecipeCard 
                                key={recipe.id} 
                                recipe={recipe} 
                                onDelete={deleteRecipe}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}