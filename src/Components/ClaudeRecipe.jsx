import ReactMarkdown from "react-markdown"
//Recipe generated 
export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite" >
            <h2>Chef AI Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}