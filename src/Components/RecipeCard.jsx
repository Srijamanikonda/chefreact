
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