const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;


const GROQ_API_KEY = "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";

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Use a currently supported Groq model
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
        max_tokens: 512,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Groq API error: ${data.error?.message || response.statusText}`);
    }

    return data.choices?.[0]?.message?.content || "No recipe generated.";
  } catch (err) {
    console.error("Error generating recipe:", err);
    return "Sorry, I couldn't generate a recipe right now.";
  }
}