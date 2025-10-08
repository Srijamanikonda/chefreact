// New component: UserRecipes.jsx
// export default function UserRecipes() {
//     const [userRecipes, setUserRecipes] = React.useState([]);
//     const [showRecipeForm, setShowRecipeForm] = React.useState(false);

//     const saveRecipe = (recipeData) => {
//         const newRecipe = {
//             id: Date.now(),
//             ...recipeData,
//             createdAt: new Date().toISOString(),
//             isUserCreated: true
//         };
//         setUserRecipes(prev => [newRecipe, ...prev]);
//         localStorage.setItem('userRecipes', JSON.stringify([...userRecipes, newRecipe]));
//     };

//     return (
//         <div className="user-recipes-section">
//             <button onClick={() => setShowRecipeForm(true)}>
//                 + Add Your Own Recipe
//             </button>
            
//             {showRecipeForm && (
//                 <RecipeForm 
//                     onSave={saveRecipe}
//                     onCancel={() => setShowRecipeForm(false)}
//                 />
//             )}
            
//             <div className="recipes-grid">
//                 {userRecipes.map(recipe => (
//                     <RecipeCard key={recipe.id} recipe={recipe} />
//                 ))}
//             </div>
//         </div>
//     );
// }
// import React from "react"

// export default function UserRecipes() {
//     const [userRecipes, setUserRecipes] = React.useState([])
//     const [showRecipeForm, setShowRecipeForm] = React.useState(false)

//     // Load recipes from localStorage
//     React.useEffect(() => {
//         const savedRecipes = localStorage.getItem('userRecipes')
//         if (savedRecipes) {
//             setUserRecipes(JSON.parse(savedRecipes))
//         }
//     }, [])

//     const saveRecipe = (recipeData) => {
//         const newRecipe = {
//             id: Date.now(),
//             ...recipeData,
//             createdAt: new Date().toISOString(),
//             isUserCreated: true
//         }
//         const updatedRecipes = [newRecipe, ...userRecipes]
//         setUserRecipes(updatedRecipes)
//         localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//         setShowRecipeForm(false)
//     }

//     const deleteRecipe = (recipeId) => {
//         const updatedRecipes = userRecipes.filter(recipe => recipe.id !== recipeId)
//         setUserRecipes(updatedRecipes)
//         localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//     }

//     return (
//         <div className="user-recipes-section">
//             <div className="section-header">
//                 <h2>My Recipe Collection</h2>
//                 <button 
//                     className="add-recipe-btn"
//                     onClick={() => setShowRecipeForm(true)}
//                 >
//                     + Add New Recipe
//                 </button>
//             </div>
            
//             {userRecipes.length === 0 ? (
//                 <div className="empty-state">
//                     <h3>No recipes yet</h3>
//                     <p>Create your first recipe or generate one with AI Chef!</p>
//                 </div>
//             ) : (
//                 <div className="recipes-grid">
//                     {userRecipes.map(recipe => (
//                         <div key={recipe.id} className="recipe-card">
//                             <h4>{recipe.title || "Untitled Recipe"}</h4>
//                             <p>{recipe.ingredients?.slice(0, 3).join(', ')}...</p>
//                             <button onClick={() => deleteRecipe(recipe.id)}>
//                                 Delete
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }
// import React from "react"
// import RecipeForm from "./Components/RecipeForm/RecipeForm.jsx"
// import RecipeCard from "./Components/RecipeCard/RecipeCard.jsx"

// export default function UserRecipes() {
//     const [userRecipes, setUserRecipes] = React.useState([])
//     const [showRecipeForm, setShowRecipeForm] = React.useState(false)
//     const [searchTerm, setSearchTerm] = React.useState("")
//     const [filter, setFilter] = React.useState("all") // all, user, ai

//     // Load recipes from localStorage
//     React.useEffect(() => {
//         const savedRecipes = localStorage.getItem('userRecipes')
//         if (savedRecipes) {
//             setUserRecipes(JSON.parse(savedRecipes))
//         }
//     }, [])

//     const saveRecipe = (recipeData) => {
//         const newRecipe = {
//             id: Date.now(),
//             ...recipeData,
//             createdAt: new Date().toISOString(),
//             isUserCreated: true
//         }
//         const updatedRecipes = [newRecipe, ...userRecipes]
//         setUserRecipes(updatedRecipes)
//         localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//         setShowRecipeForm(false)
//     }

//     const deleteRecipe = (recipeId) => {
//         const updatedRecipes = userRecipes.filter(recipe => recipe.id !== recipeId)
//         setUserRecipes(updatedRecipes)
//         localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//     }

//     // Filter recipes based on search and filter
//     const filteredRecipes = userRecipes.filter(recipe => {
//         const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             recipe.ingredients?.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
        
//         const matchesFilter = filter === "all" || 
//                             (filter === "user" && recipe.isUserCreated) ||
//                             (filter === "ai" && !recipe.isUserCreated)
        
//         return matchesSearch && matchesFilter
//     })

//     return (
//         <div className="user-recipes-section">
//             <div className="section-header">
//                 <h2>My Recipe Collection</h2>
//                 <button 
//                     className="add-recipe-btn"
//                     onClick={() => setShowRecipeForm(true)}
//                 >
//                     <span>+</span> Add New Recipe
//                 </button>
//             </div>

//             {/* Search and Filter Bar */}
//             <div className="search-filter-bar" style={{
//                 display: 'flex', 
//                 gap: '1rem', 
//                 marginBottom: '2rem', 
//                 flexWrap: 'wrap'
//             }}>
//                 <input
//                     type="text"
//                     placeholder="🔍 Search recipes..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{
//                         flex: '1',
//                         minWidth: '200px',
//                         padding: '12px 16px',
//                         border: '2px solid rgba(255, 255, 255, 0.3)',
//                         borderRadius: 'var(--border-radius)',
//                         background: 'rgba(255, 255, 255, 0.9)',
//                         fontSize: '1rem'
//                     }}
//                 />
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     style={{
//                         padding: '12px 16px',
//                         border: '2px solid rgba(255, 255, 255, 0.3)',
//                         borderRadius: 'var(--border-radius)',
//                         background: 'rgba(255, 255, 255, 0.9)',
//                         fontSize: '1rem',
//                         minWidth: '150px'
//                     }}
//                 >
//                     <option value="all">All Recipes</option>
//                     <option value="user">My Recipes</option>
//                     <option value="ai">AI Recipes</option>
//                 </select>
//             </div>
            
//             {showRecipeForm && (
//                 <RecipeForm 
//                     onSave={saveRecipe}
//                     onCancel={() => setShowRecipeForm(false)}
//                 />
//             )}
            
//             {filteredRecipes.length === 0 ? (
//                 <div className="empty-state">
//                     <h3>No recipes found</h3>
//                     <p>{searchTerm || filter !== "all" ? 
//                         "Try adjusting your search or filter" : 
//                         "Create your first recipe or generate one with AI Chef!"
//                     }</p>
//                 </div>
//             ) : (
//                 <div className="recipes-grid">
//                     {filteredRecipes.map(recipe => (
//                         <RecipeCard 
//                             key={recipe.id} 
//                             recipe={recipe} 
//                             onDelete={deleteRecipe}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }
// import React from "react"
// import RecipeForm from "./RecipeForm.jsx"  // Make sure this path is correct
// import RecipeCard from "./RecipeCard.jsx"

// export default function UserRecipes() {
//     const [userRecipes, setUserRecipes] = React.useState([])
//     const [showRecipeForm, setShowRecipeForm] = React.useState(false)
//     const [searchTerm, setSearchTerm] = React.useState("")
//     const [filter, setFilter] = React.useState("all")

//     // Load recipes from localStorage
//     React.useEffect(() => {
//         const savedRecipes = localStorage.getItem('userRecipes')
//         if (savedRecipes) {
//             setUserRecipes(JSON.parse(savedRecipes))
//         }
//     }, [])

//     const saveRecipe = (recipeData) => {
//         const newRecipe = {
//             id: Date.now(),
//             ...recipeData,
//             createdAt: new Date().toISOString(),
//             isUserCreated: true
//         }
//         const updatedRecipes = [newRecipe, ...userRecipes]
//         setUserRecipes(updatedRecipes)
//         localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//         setShowRecipeForm(false)
        
//         // Reset form
//         setShowRecipeForm(false)
//     }

//     const deleteRecipe = (recipeId) => {
//         if (window.confirm('Are you sure you want to delete this recipe?')) {
//             const updatedRecipes = userRecipes.filter(recipe => recipe.id !== recipeId)
//             setUserRecipes(updatedRecipes)
//             localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//         }
//     }

//     const filteredRecipes = userRecipes.filter(recipe => {
//         const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             recipe.ingredients?.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
        
//         const matchesFilter = filter === "all" || 
//                             (filter === "user" && recipe.isUserCreated) ||
//                             (filter === "ai" && !recipe.isUserCreated)
        
//         return matchesSearch && matchesFilter
//     })

//     return (
//         <div className="user-recipes-section">
//             <div className="section-header">
//                 <h2>My Recipe Collection</h2>
//                 <button 
//                     className="add-recipe-btn"
//                     onClick={() => setShowRecipeForm(true)}
//                 >
//                     <span>+</span> Add New Recipe
//                 </button>
//             </div>

//             {/* Search and Filter */}
//             <div className="search-filter-bar">
//                 <input
//                     type="text"
//                     placeholder="🔍 Search recipes..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                 >
//                     <option value="all">All Recipes</option>
//                     <option value="user">My Recipes</option>
//                     <option value="ai">AI Recipes</option>
//                 </select>
//             </div>
            
//             {showRecipeForm && (
//                 <RecipeForm 
//                     onSave={saveRecipe}
//                     onCancel={() => setShowRecipeForm(false)}
//                 />
//             )}
            
//             {filteredRecipes.length === 0 ? (
//                 <div className="empty-state">
//                     <h3>No recipes found</h3>
//                     <p>
//                         {userRecipes.length === 0 
//                             ? "Create your first recipe or generate one with AI Chef!" 
//                             : "Try adjusting your search or filter"
//                         }
//                     </p>
//                     {userRecipes.length === 0 && (
//                         <button 
//                             className="add-recipe-btn"
//                             onClick={() => setShowRecipeForm(true)}
//                             style={{marginTop: '1rem'}}
//                         >
//                             + Create Your First Recipe
// //                         </button>
// //                     )}
// //                 </div>
// //             ) : (
// //                 <div className="recipes-grid">
// //                     {filteredRecipes.map(recipe => (
// //                         <RecipeCard 
// //                             key={recipe.id} 
// //                             recipe={recipe} 
// //                             onDelete={deleteRecipe}
// //                         />
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }
// // src/Components/UserRecipes.jsx
// import React from 'react';
// import RecipeCard from './RecipeCard';

// export default function UserRecipes() {
//     const [recipes, setRecipes] = React.useState([]);

//     React.useEffect(() => {
//         // Load recipes from localStorage on mount
//         const savedRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
//         setRecipes(savedRecipes);
//     }, []);

//     // Function to handle recipe deletion
//     const deleteRecipe = (id) => {
//         if (window.confirm('Are you sure you want to delete this recipe?')) {
//             const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
//             setRecipes(updatedRecipes);
//             localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
//         }
//     }
    
//     // Placeholder for adding a user recipe (you would implement a modal/form here)
//     const startAddRecipe = () => {
//         alert("Adding a new custom recipe form would go here! For now, try saving an AI-generated one.");
//     }
    
//     const isEmpty = recipes.length === 0;

//     return (
//         <div className="user-recipes-section glass-container">
//             <div className="section-header">
//                 <h2>Your Recipe Collection</h2>
//                 <button 
//                     className="add-recipe-btn"
//                     onClick={startAddRecipe}
//                 >
// //                     + Add My Own Recipe
// //                 </button>
// //             </div>

// //             {isEmpty ? (
// //                 <div className="empty-state">
// //                     <h3>No Recipes Saved Yet!</h3>
// //                     <p>Start by asking the AI Chef for a recipe and saving it to your collection.</p>
// //                 </div>
// //             ) : (
// //                 <div className="recipes-grid">
// //                     {recipes.map(recipe => (
// //                         <RecipeCard 
// //                             key={recipe.id} 
// //                             recipe={recipe} 
// //                             onDelete={deleteRecipe}
// //                             // onEdit={startEditRecipe} // Edit function would go here
// //                         />
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// import React from "react"
// import RecipeForm from "./RecipeForm.jsx"  // Make sure this path is correct
// import RecipeCard from "./RecipeCard.jsx"

// export default function UserRecipes() {
//     const [userRecipes, setUserRecipes] = React.useState([])
//     const [showRecipeForm, setShowRecipeForm] = React.useState(false)
//     const [searchTerm, setSearchTerm] = React.useState("")
//     const [filter, setFilter] = React.useState("all")

//     // Load recipes from localStorage
//     React.useEffect(() => {
//         const savedRecipes = localStorage.getItem('userRecipes')
//         if (savedRecipes) {
//             setUserRecipes(JSON.parse(savedRecipes))
//         }
//     }, [])

//     const saveRecipe = (recipeData) => {
//         const newRecipe = {
//             id: Date.now(),
//             ...recipeData,
//             createdAt: new Date().toISOString(),
//             isUserCreated: true
//         }
//         const updatedRecipes = [newRecipe, ...userRecipes]
//         setUserRecipes(updatedRecipes)
//         localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//         setShowRecipeForm(false)
        
//         // Reset form
//         setShowRecipeForm(false)
//     }

//     const deleteRecipe = (recipeId) => {
//         if (window.confirm('Are you sure you want to delete this recipe?')) {
//             const updatedRecipes = userRecipes.filter(recipe => recipe.id !== recipeId)
//             setUserRecipes(updatedRecipes)
//             localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes))
//         }
//     }

//     const filteredRecipes = userRecipes.filter(recipe => {
//         const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             recipe.ingredients?.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
        
//         const matchesFilter = filter === "all" || 
//                             (filter === "user" && recipe.isUserCreated) ||
//                             (filter === "ai" && !recipe.isUserCreated)
        
//         return matchesSearch && matchesFilter
//     })

//     return (
//         <div className="user-recipes-section">
//             <div className="section-header">
//                 <h2>My Recipe Collection</h2>
//                 <button 
//                     className="add-recipe-btn"
//                     onClick={() => setShowRecipeForm(true)}
//                 >
//                     <span>+</span> Add New Recipe
//                 </button>
//             </div>

//             {/* Search and Filter */}
//             <div className="search-filter-bar">
//                 <input
//                     type="text"
//                     placeholder="🔍 Search recipes..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                 >
//                     <option value="all">All Recipes</option>
//                     <option value="user">My Recipes</option>
//                     <option value="ai">AI Recipes</option>
//                 </select>
//             </div>
            
//             {showRecipeForm && (
//                 <RecipeForm 
//                     onSave={saveRecipe}
//                     onCancel={() => setShowRecipeForm(false)}
//                 />
//             )}
            
//             {filteredRecipes.length === 0 ? (
//                 <div className="empty-state">
//                     <h3>No recipes found</h3>
//                     <p>
//                         {userRecipes.length === 0 
//                             ? "Create your first recipe or generate one with AI Chef!" 
//                             : "Try adjusting your search or filter"
//                         }
//                     </p>
//                     {userRecipes.length === 0 && (
//                         <button 
//                             className="add-recipe-btn"
//                             onClick={() => setShowRecipeForm(true)}
//                             style={{marginTop: '1rem'}}
//                         >
//                             + Create Your First Recipe
//                         </button>
//                     )}
//                 </div>
//             ) : (
//                 <div className="recipes-grid">
//                     {filteredRecipes.map(recipe => (
//                         <RecipeCard 
//                             key={recipe.id} 
//                             recipe={recipe} 
//                             onDelete={deleteRecipe}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }
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