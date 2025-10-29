
import React from "react"

export default function RecipeForm({ onSave, onCancel }) {
    const [formData, setFormData] = React.useState({
        title: '',
        ingredients: [''],
        instructions: [''],
        prepTime: '',
        cookTime: '',
        difficulty: 'Easy',
        servings: ''
    })

    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, '']
        }))
    }

    const updateIngredient = (index, value) => {
        const newIngredients = [...formData.ingredients]
        newIngredients[index] = value
        setFormData(prev => ({ ...prev, ingredients: newIngredients }))
    }

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            const newIngredients = formData.ingredients.filter((_, i) => i !== index)
            setFormData(prev => ({ ...prev, ingredients: newIngredients }))
        }
    }

    const addInstruction = () => {
        setFormData(prev => ({
            ...prev,
            instructions: [...prev.instructions, '']
        }))
    }

    const updateInstruction = (index, value) => {
        const newInstructions = [...formData.instructions]
        newInstructions[index] = value
        setFormData(prev => ({ ...prev, instructions: newInstructions }))
    }

    const removeInstruction = (index) => {
        if (formData.instructions.length > 1) {
            const newInstructions = formData.instructions.filter((_, i) => i !== index)
            setFormData(prev => ({ ...prev, instructions: newInstructions }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Filter out empty fields
        const filteredData = {
            ...formData,
            ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
            instructions: formData.instructions.filter(inst => inst.trim() !== '')
        }

        // Validation
        if (!filteredData.title.trim()) {
            alert('Please enter a recipe title')
            return
        }

        if (filteredData.ingredients.length === 0) {
            alert('Please add at least one ingredient')
            return
        }

        if (filteredData.instructions.length === 0) {
            alert('Please add at least one instruction')
            return
        }

        onSave(filteredData)
    }

    return (
        <div className="recipe-form-overlay">
            <div className="recipe-form-container">
                <form className="recipe-form" onSubmit={handleSubmit}>
                    <h3>🍳 Create New Recipe</h3>
                    
                    <div className="form-group">
                        <label>Recipe Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                            placeholder="e.g., Spaghetti Carbonara"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Prep Time</label>
                            <input
                                type="text"
                                value={formData.prepTime}
                                onChange={(e) => setFormData(prev => ({...prev, prepTime: e.target.value}))}
                                placeholder="e.g., 15 mins"
                            />
                        </div>
                        <div className="form-group">
                            <label>Cook Time</label>
                            <input
                                type="text"
                                value={formData.cookTime}
                                onChange={(e) => setFormData(prev => ({...prev, cookTime: e.target.value}))}
                                placeholder="e.g., 20 mins"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Servings</label>
                            <input
                                type="text"
                                value={formData.servings}
                                onChange={(e) => setFormData(prev => ({...prev, servings: e.target.value}))}
                                placeholder="e.g., 4 people"
                            />
                        </div>
                        <div className="form-group">
                            <label>Difficulty</label>
                            <select
                                value={formData.difficulty}
                                onChange={(e) => setFormData(prev => ({...prev, difficulty: e.target.value}))}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ingredients *</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="input-with-remove">
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => updateIngredient(index, e.target.value)}
                                    placeholder={`Ingredient ${index + 1}`}
                                />
                                {formData.ingredients.length > 1 && (
                                    <button 
                                        type="button" 
                                        className="remove-btn"
                                        onClick={() => removeIngredient(index)}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient} className="add-btn">
                            + Add Ingredient
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Instructions *</label>
                        {formData.instructions.map((instruction, index) => (
                            <div key={index} className="input-with-remove">
                                <textarea
                                    value={instruction}
                                    onChange={(e) => updateInstruction(index, e.target.value)}
                                    placeholder={`Step ${index + 1}`}
                                    rows="3"
                                />
                                {formData.instructions.length > 1 && (
                                    <button 
                                        type="button" 
                                        className="remove-btn"
                                        onClick={() => removeInstruction(index)}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addInstruction} className="add-btn">
                            + Add Step
                        </button>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            Save Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}