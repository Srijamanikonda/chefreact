// // // Components/RecipeCard.jsx
// // export default function RecipeCard({ recipe }) {
// //     const [isExpanded, setIsExpanded] = React.useState(false);

// //     return (
// //         <div className={`recipe-card ${recipe.isUserCreated ? 'user-created' : 'ai-generated'}`}>
// //             <div className="recipe-header">
// //                 <h4>{recipe.title}</h4>
// //                 {recipe.isUserCreated && <span className="badge">Your Recipe</span>}
// //             </div>
            
// //             <div className="recipe-meta">
// //                 {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
// //                 {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
// //                 {recipe.difficulty && <span>{recipe.difficulty}</span>}
// //             </div>

// //             <button onClick={() => setIsExpanded(!isExpanded)}>
// //                 {isExpanded ? 'Show Less' : 'View Recipe'}
// //             </button>

// //             {isExpanded && (
// //                 <div className="recipe-details">
// //                     <div className="ingredients">
// //                         <h5>Ingredients</h5>
// //                         <ul>
// //                             {recipe.ingredients.map((ingredient, index) => (
// //                                 <li key={index}>{ingredient}</li>
// // //                             ))}
// // //                         </ul>
// // //                     </div>
                    
// // //                     <div className="instructions">
// // //                         <h5>Instructions</h5>
// // //                         <ol>
// // //                             {recipe.instructions.map((instruction, index) => (
// // //                                 <li key={index}>{instruction}</li>
// // //                             ))}
// // //                         </ol>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }
// // import React from "react"

// // export default function RecipeCard({ recipe, onDelete }) {
// //     const [isExpanded, setIsExpanded] = React.useState(false)

// //     return (
// //         <div className="recipe-card">
// //             <div className="recipe-header">
// //                 <h4>{recipe.title || "Untitled Recipe"}</h4>
// //                 {recipe.isUserCreated && <span className="badge">Your Recipe</span>}
// //             </div>
            
// //             <button onClick={() => setIsExpanded(!isExpanded)}>
// //                 {isExpanded ? 'Show Less' : 'View Recipe'}
// //             </button>

// //             {isExpanded && (
// //                 <div className="recipe-details">
// //                     {recipe.ingredients && (
// //                         <div className="ingredients">
// //                             <h5>Ingredients</h5>
// //                             <ul>
// //                                 {recipe.ingredients.map((ingredient, index) => (
// //                                     <li key={index}>{ingredient}</li>
// //                                 ))}
// //                             </ul>
// //                         </div>
// //                     )}
                    
// //                     {recipe.instructions && (
// //                         <div className="instructions">
// //                             <h5>Instructions</h5>
// //                             <ol>
// //                                 {recipe.instructions.map((instruction, index) => (
// //                                     <li key={index}>{instruction}</li>
// //                                 ))}
// //                             </ol>
// //                         </div>
// //                     )}
                    
// //                     {recipe.isUserCreated && (
// //                         <button onClick={() => onDelete(recipe.id)} className="delete-btn">
// //                             Delete Recipe
// //                         </button>
// //                     )}
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }import React from "react"

// export default function RecipeCard({ recipe, onDelete }) {
//     const [isExpanded, setIsExpanded] = React.useState(false)

//     const formatContent = (content) => {
//         if (typeof content === 'string') {
//             return content.split('\n').map((line, index) => {
//                 if (line.startsWith('## ')) {
//                     return <h4 key={index} style={{margin: '1rem 0 0.5rem 0', color: 'var(--text-primary)'}}>{line.replace('## ', '')}</h4>
//                 } else if (line.startsWith('# ')) {
//                     return <h3 key={index} style={{margin: '1.5rem 0 1rem 0', color: 'var(--text-primary)'}}>{line.replace('# ', '')}</h3>
//                 } else if (line.trim() === '') {
//                     return <br key={index} />
//                 } else if (line.startsWith('- ') || line.startsWith('* ')) {
//                     return <li key={index} style={{marginLeft: '1rem', marginBottom: '0.25rem'}}>{line.replace(/^[-*] /, '')}</li>
//                 } else {
//                     return <p key={index} style={{marginBottom: '0.5rem'}}>{line}</p>
//                 }
//             })
//         }
//         return content
//     }

//     return (
//         <div className={`recipe-card ${recipe.isUserCreated ? 'user-created' : 'ai-generated'}`}>
//             <div className="recipe-header">
//                 <h4>{recipe.title || "AI Generated Recipe"}</h4>
//                 <div className="recipe-badges">
//                     {recipe.isUserCreated ? (
//                         <span className="badge user-badge">Your Recipe</span>
//                     ) : (
//                         <span className="badge ai-badge">AI Generated</span>
//                     )}
//                     {recipe.difficulty && (
//                         <span className={`badge difficulty-${recipe.difficulty.toLowerCase()}`} style={{
//                             background: recipe.difficulty === 'Easy' ? '#10B981' : 
//                                        recipe.difficulty === 'Medium' ? '#F59E0B' : '#EF4444'
//                         }}>
//                             {recipe.difficulty}
//                         </span>
//                     )}
//                 </div>
//             </div>
            
//             <div className="recipe-meta">
//                 {recipe.prepTime && <span>⏱️ {recipe.prepTime}</span>}
//                 {recipe.cookTime && <span>🍳 {recipe.cookTime}</span>}
//                 {recipe.servings && <span>👥 {recipe.servings}</span>}
//                 <span className="date" style={{color: 'var(--text-light)'}}>
//                     {new Date(recipe.createdAt).toLocaleDateString()}
//                 </span>
//             </div>

//             {recipe.ingredients && (
//                 <div className="ingredients-preview">
//                     <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
//                     {recipe.ingredients.length > 3 && `... (+${recipe.ingredients.length - 3} more)`}
//                 </div>
//             )}

//             <div className="recipe-actions">
//                 <button 
//                     onClick={() => setIsExpanded(!isExpanded)}
//                     className="toggle-btn"
//                 >
//                     {isExpanded ? '▲ Show Less' : '▼ View Recipe'}
//                 </button>
                
//                 {recipe.isUserCreated && (
//                     <button 
//                         onClick={() => {
//                             if (window.confirm('Are you sure you want to delete this recipe?')) {
//                                 onDelete(recipe.id)
//                             }
//                         }}
//                         className="delete-btn"
//                     >
//                         🗑️ Delete
//                     </button>
//                 )}
//             </div>

//             {isExpanded && (
// //                 <div className="recipe-details" style={{
// //                     marginTop: '1rem',
// //                     paddingTop: '1rem',
// //                     borderTop: '1px solid var(--border-color)'
// //                 }}>
// //                     {recipe.content ? (
// //                         <div className="recipe-content">
// //                             {formatContent(recipe.content)}
// //                         </div>
// //                     ) : (
// //                         <>
// //                             {recipe.ingredients && (
// //                                 <div className="ingredients">
// //                                     <h5 style={{marginBottom: '0.5rem', color: 'var(--text-primary)'}}>Ingredients</h5>
// //                                     <ul style={{paddingLeft: '1.5rem', marginBottom: '1rem'}}>
// //                                         {recipe.ingredients.map((ingredient, index) => (
// //                                             <li key={index} style={{marginBottom: '0.25rem'}}>{ingredient}</li>
// //                                         ))}
// //                                     </ul>
// //                                 </div>
// //                             )}
                            
// //                             {recipe.instructions && (
// //                                 <div className="instructions">
// //                                     <h5 style={{marginBottom: '0.5rem', color: 'var(--text-primary)'}}>Instructions</h5>
// //                                     <ol style={{paddingLeft: '1.5rem'}}>
// //                                         {recipe.instructions.map((instruction, index) => (
// //                                             <li key={index} style={{marginBottom: '0.5rem'}}>{instruction}</li>
// //                                         ))}
// //                                     </ol>
// //                                 </div>
// //                             )}
// //                         </>
// //                     )}
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }
// // src/Components/RecipeCard.jsx
// import React from 'react';

// export default function RecipeCard({ recipe, onDelete }) {
//     const { id, title, ingredients, isUserCreated, createdAt, content } = recipe;
    
//     // Simple state to toggle full recipe view (could be a separate modal/page)
//     const [isExpanded, setIsExpanded] = React.useState(false);

// //     // Simple function to extract a preview of the recipe
// //     const getPreview = (text) => {
// //         // Simple markdown cleaning and truncation
// //         const cleanText = text.replace(/#|##|\*|\[.*\]|\(.*\)/g, '').trim();
// //         return cleanText.substring(0, 150) + (cleanText.length > 150 ? '...' : '');
// //     }

// //     return (
// //         <div className={`recipe-card ${isUserCreated ? 'user-created' : 'ai-generated'}`}>
// //             <div className="recipe-header">
// //                 <h4>{title}</h4>
// //                 <div className="recipe-badges">
// //                     <span className={`badge ${isUserCreated ? 'user-badge' : 'ai-badge'}`}>
// //                         {isUserCreated ? 'User' : 'AI'}
// //                     </span>
// //                 </div>
// //             </div>

// //             <div className="recipe-meta">
// //                 <span>
// //                     {/* Placeholder for an icon like a clock */}
// //                     🕒 
// //                     {new Date(createdAt).toLocaleDateString()}
// //                 </span>
// //                 <span>
// //                     {/* Placeholder for an icon like a fork/knife */}
// //                     🍴 
// //                     {ingredients.length} ingredients
// //                 </span>
// //             </div>

// //             <p className="ingredients-preview">
// //                 **Key Ingredients**: {ingredients.slice(0, 3).join(', ')}...
// //             </p>

// //             <div className="recipe-actions">
// //                 <button 
// //                     className="toggle-btn" 
// //                     onClick={() => setIsExpanded(prev => !prev)}
// //                 >
// //                     {isExpanded ? 'Show Less' : 'View Details'}
// //                 </button>
// //                 <button 
// //                     className="delete-btn"
// //                     onClick={() => onDelete(id)}
// //                 >
// //                     🗑️ Delete
// //                 </button>
// //             </div>
            
// //             {/* Simple Inline Expansion */}
// //             {isExpanded && (
// //                 <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
// //                     <p style={{whiteSpace: 'pre-wrap', fontSize: '0.9rem'}}>{content}</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// // src/Components/RecipeCard.jsx
// import React from 'react';

// export default function RecipeCard({ recipe, onDelete }) {
//     const { id, title, ingredients, isUserCreated, createdAt, content } = recipe;
    
//     // Simple state to toggle full recipe view (could be a separate modal/page)
//     const [isExpanded, setIsExpanded] = React.useState(false);

//     // Simple function to extract a preview of the recipe
//     const getPreview = (text) => {
//         // Simple markdown cleaning and truncation
//         const cleanText = text.replace(/#|##|\*|\[.*\]|\(.*\)/g, '').trim();
//         return cleanText.substring(0, 150) + (cleanText.length > 150 ? '...' : '');
//     }

//     return (
//         <div className={`recipe-card ${isUserCreated ? 'user-created' : 'ai-generated'}`}>
//             <div className="recipe-header">
//                 <h4>{title}</h4>
//                 <div className="recipe-badges">
//                     <span className={`badge ${isUserCreated ? 'user-badge' : 'ai-badge'}`}>
//                         {isUserCreated ? 'User' : 'AI'}
//                     </span>
//                 </div>
//             </div>

//             <div className="recipe-meta">
//                 <span>
//                     {/* Placeholder for an icon like a clock */}
//                     🕒 
//                     {new Date(createdAt).toLocaleDateString()}
//                 </span>
//                 <span>
//                     {/* Placeholder for an icon like a fork/knife */}
//                     🍴 
//                     {ingredients.length} ingredients
//                 </span>
//             </div>

//             <p className="ingredients-preview">
//                 **Key Ingredients**: {ingredients.slice(0, 3).join(', ')}...
//             </p>

//             <div className="recipe-actions">
//                 <button 
//                     className="toggle-btn" 
//                     onClick={() => setIsExpanded(prev => !prev)}
//                 >
//                     {isExpanded ? 'Show Less' : 'View Details'}
//                 </button>
//                 <button 
//                     className="delete-btn"
//                     onClick={() => onDelete(id)}
//                 >
//                     🗑️ Delete
//                 </button>
//             </div>
            
//             {/* Simple Inline Expansion */}
//             {isExpanded && (
//                 <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
//                     <p style={{whiteSpace: 'pre-wrap', fontSize: '0.9rem'}}>{content}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
//proper working one
// import React from "react"

// export default function RecipeCard({ recipe, onDelete }) {
//     const [isExpanded, setIsExpanded] = React.useState(false)

//     const formatContent = (content) => {
//         if (typeof content === 'string') {
//             return content.split('\n').map((line, index) => {
//                 if (line.startsWith('## ')) {
//                     return <h4 key={index} style={{margin: '1rem 0 0.5rem 0', color: 'var(--text-primary)'}}>{line.replace('## ', '')}</h4>
//                 } else if (line.startsWith('# ')) {
//                     return <h3 key={index} style={{margin: '1.5rem 0 1rem 0', color: 'var(--text-primary)'}}>{line.replace('# ', '')}</h3>
//                 } else if (line.trim() === '') {
//                     return <br key={index} />
//                 } else if (line.startsWith('- ') || line.startsWith('* ')) {
//                     return <li key={index} style={{marginLeft: '1rem', marginBottom: '0.25rem'}}>{line.replace(/^[-*] /, '')}</li>
//                 } else {
//                     return <p key={index} style={{marginBottom: '0.5rem'}}>{line}</p>
//                 }
//             })
//         }
//         return null
//     }

//     return (
//         <div className={`recipe-card ${recipe.isUserCreated ? 'user-created' : 'ai-generated'}`}>
//             <div className="recipe-header">
//                 <h4>{recipe.title || "Untitled Recipe"}</h4>
//                 <div className="recipe-badges">
//                     {recipe.isUserCreated ? (
//                         <span className="badge user-badge">Your Recipe</span>
//                     ) : (
//                         <span className="badge ai-badge">AI Generated</span>
//                     )}
//                     {recipe.difficulty && (
//                         <span className={`badge difficulty-${recipe.difficulty.toLowerCase()}`}>
//                             {recipe.difficulty}
//                         </span>
//                     )}
//                 </div>
//             </div>
            
//             <div className="recipe-meta">
//                 {recipe.prepTime && <span>⏱️ Prep: {recipe.prepTime}</span>}
//                 {recipe.cookTime && <span>🍳 Cook: {recipe.cookTime}</span>}
//                 {recipe.servings && <span>👥 Serves: {recipe.servings}</span>}
//                 <span className="date">
//                     {new Date(recipe.createdAt).toLocaleDateString()}
//                 </span>
//             </div>

//             {recipe.ingredients && recipe.ingredients.length > 0 && (
//                 <div className="ingredients-preview">
//                     <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
//                     {recipe.ingredients.length > 3 && `... (+${recipe.ingredients.length - 3} more)`}
//                 </div>
//             )}

//             <div className="recipe-actions">
//                 <button 
//                     onClick={() => setIsExpanded(!isExpanded)}
//                     className="toggle-btn"
//                 >
//                     {isExpanded ? '▲ Show Less' : '▼ View Recipe'}
//                 </button>
                
//                 {recipe.isUserCreated && (
//                     <button 
//                         onClick={() => onDelete(recipe.id)}
//                         className="delete-btn"
//                     >
//                         🗑️ Delete
//                     </button>
//                 )}
//             </div>

//             {isExpanded && (
//                 <div className="recipe-details">
//                     {recipe.content ? (
//                         <div className="recipe-content">
//                             {formatContent(recipe.content)}
//                         </div>
//                     ) : (
//                         <>
//                             {recipe.ingredients && recipe.ingredients.length > 0 && (
//                                 <div className="ingredients">
//                                     <h5>📋 Ingredients</h5>
//                                     <ul>
//                                         {recipe.ingredients.map((ingredient, index) => (
//                                             <li key={index}>{ingredient}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
                            
//                             {recipe.instructions && recipe.instructions.length > 0 && (
//                                 <div className="instructions">
//                                     <h5>👩‍🍳 Instructions</h5>
//                                     <ol>
//                                         {recipe.instructions.map((instruction, index) => (
//                                             <li key={index}>{instruction}</li>
//                                         ))}
//                                     </ol>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }
import React from "react"

export default function RecipeCard({ recipe, onDelete }) {
    const [isExpanded, setIsExpanded] = React.useState(false)

    const formatContent = (content) => {
        if (typeof content === 'string') {
            return content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                    return <h4 key={index} style={{margin: '1rem 0 0.5rem 0', color: 'var(--text-primary)'}}>{line.replace('## ', '')}</h4>
                } else if (line.startsWith('# ')) {
                    return <h3 key={index} style={{margin: '1.5rem 0 1rem 0', color: 'var(--text-primary)'}}>{line.replace('# ', '')}</h3>
                } else if (line.trim() === '') {
                    return <br key={index} />
                } else if (line.startsWith('- ') || line.startsWith('* ')) {
                    return <li key={index} style={{marginLeft: '1rem', marginBottom: '0.25rem'}}>{line.replace(/^[-*] /, '')}</li>
                } else {
                    return <p key={index} style={{marginBottom: '0.5rem'}}>{line}</p>
                }
            })
        }
        return null
    }

    return (
        <div className={`recipe-card ${recipe.isUserCreated ? 'user-created' : 'ai-generated'}`}>
            <div className="recipe-header">
                <h4>{recipe.title || "Untitled Recipe"}</h4>
                <div className="recipe-badges">
                    {recipe.isUserCreated ? (
                        <span className="badge user-badge">Your Recipe</span>
                    ) : (
                        <span className="badge ai-badge">AI Generated</span>
                    )}
                    {recipe.difficulty && (
                        <span className={`badge difficulty-${recipe.difficulty.toLowerCase()}`}>
                            {recipe.difficulty}
                        </span>
                    )}
                </div>
            </div>
            
            <div className="recipe-meta">
                {recipe.prepTime && <span>⏱️ Prep: {recipe.prepTime}</span>}
                {recipe.cookTime && <span>🍳 Cook: {recipe.cookTime}</span>}
                {recipe.servings && <span>👥 Serves: {recipe.servings}</span>}
                <span className="date">
                    {new Date(recipe.createdAt).toLocaleDateString()}
                </span>
            </div>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="ingredients-preview">
                    <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && `... (+${recipe.ingredients.length - 3} more)`}
                </div>
            )}

            <div className="recipe-actions">
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="toggle-btn"
                >
                    {isExpanded ? '▲ Show Less' : '▼ View Recipe'}
                </button>
                
                {/* ALWAYS show delete button for ALL recipes */}
                <button 
                    onClick={() => onDelete(recipe.id)}
                    className="delete-btn"
                >
                    🗑️ Delete
                </button>
            </div>

            {isExpanded && (
                <div className="recipe-details">
                    {recipe.content ? (
                        <div className="recipe-content">
                            {formatContent(recipe.content)}
                        </div>
                    ) : (
                        <>
                            {recipe.ingredients && recipe.ingredients.length > 0 && (
                                <div className="ingredients">
                                    <h5>📋 Ingredients</h5>
                                    <ul>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {recipe.instructions && recipe.instructions.length > 0 && (
                                <div className="instructions">
                                    <h5>👩‍🍳 Instructions</h5>
                                    <ol>
                                        {recipe.instructions.map((instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}