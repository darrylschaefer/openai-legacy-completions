# OpenAI “Legacy” Completion Playground

A Next.js web application that serves as an API playground to OpenAI’s Legacy Completion API (for those of us who still love that API endpoint!). It includes:

- A collapsible “Settings” panel with controls for model, temperature, token usage, etc.
- A textarea for user prompts.
- A method to save all outputs to a local file (saved_outputs.txt).


![image](https://github.com/user-attachments/assets/84e212c0-84fc-48dc-996a-055eb0a1050b)



Toggle a button to show/hide advanced settings, including:

- Model selection (babbage-002, davinci-002, gpt-3.5-turbo-instruct)
- Temperature, max_tokens, top_p, frequency_penalty, presence_penalty sliders
- Optional output saving to file
- Integration with the Legacy Completions Endpoint

When “Save output to file” is checked, the response is appended to a local text file (saved_outputs.txt) in the project root folder.

## Prerequisites

- Node.js (v16 or newer recommended)
- npm (or yarn)
- An OpenAI API Key (sign up at https://platform.openai.com/)


## Getting Started
Clone or Download the repository:

- git clone https://github.com/your-username/openai-legacy-completions.git
- cd openai-legacy-completions

Install Dependencies:

npm install

Set Up Environment Variables:

Create a file named .env.local at the project root if it doesn’t already exist.

Add the following line, replacing INSERT OPENAI API KEY HERE with your actual OpenAI API key:

OPENAI_API_KEY="YOUR_API_KEY"

.env.local is typically ignored by Git, so your API key remains private.

Run the Development Server:

npm run dev

By default, this starts your app on http://localhost:3000.

## Usage

Open the App
- Navigate to http://localhost:3000 in your browser.

Enter Your Prompt
- Type the prompt or question you want to send to the OpenAI completion endpoint in the large textarea.

Adjust Settings (optional)
- Click “Hide Settings” / “Show Settings” to toggle the panel.
- Choose the model (babbage-002, davinci-002, or gpt-3.5-turbo-instruct).
- Adjust temperature, max tokens, top_p, frequency penalty, or presence penalty with the sliders.

Save Output (optional)
- Check “Save output to file” before clicking “Generate.”
- The output is appended to saved_outputs.txt.

Generate
- Click the “Generate” button.
- The OpenAI response appears in the “Output” section below.

Deployment
If you plan to deploy to a hosting platform:

- Ensure the platform supports Node.js and Next.js 13.
- For serverless platforms like Vercel, note that ephemeral file systems may prevent permanent saving of outputs. Use a more permanent storage (e.g., S3, a database) if needed.
- Remember to set your OPENAI_API_KEY environment variable in the hosting service’s configuration.

## Troubleshooting

“404 Not Found” when hitting /api/completions
- Check that your folder is exactly app/api/completions/route.js.
- Confirm you restarted the dev server after creating the file.

“Error calling OpenAI API” or “Request failed”
- Verify your .env.local has the correct OPENAI_API_KEY.
- Ensure your network/firewall isn’t blocking requests to the OpenAI endpoint.
- Check logs in your terminal and/or browser console for more specific errors.

Outputs not showing in saved_outputs.txt
- Make sure you have the “Save output to file” checkbox selected before generating.
- Check file permissions in your hosting environment, or confirm you’re running locally.

## Contributing
- Fork and clone the repo, then create a new branch for your feature or bug fix.
- Open a Pull Request describing your changes.
