# Chef Claude 👨‍🍳

Chef Claude is a recipe suggestion web app that helps you generate recipes based on the ingredients you have on hand. Simply add your ingredients to the list, and Chef Claude will suggest a recipe you can create!

Built with React, it allows users to input ingredients, which are stored in the app’s state. Once the user has enough ingredients, the app sends the list to Hugging Face's Mistral model via the HfInference API, which generates a recipe suggestion in markdown format. The recipe is then displayed using ReactMarkdown, offering a clean and easy-to-read layout. The app is styled with CSS and optionally Bootstrap for responsiveness. The entire project utilizes Vite for fast development

## Features 🚀

- **Add Ingredients**: Input your available ingredients, and Chef Claude will suggest recipes based on them.
- **AI Recipe Generation**: Powered by Hugging Face's Mistral model, Chef Claude intelligently generates recipes with a markdown-friendly format.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Tech Stack 🛠

- **React**: For building the frontend UI🖥️.
- **Hugging Face API🤖**: For generating recipes using the Mistral model. A large language model fine-tuned for instruction-based tasks.It takes in the list of ingredients as input and generates a recipe in markdown format.
- **ReactMarkdown**: To render recipe suggestions in markdown format.
- **CSS**: For styling the application.
- **Bootstrap**: For responsive design and UI components.


### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** or **yarn**

