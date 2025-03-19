"use server";


import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";


const configuration = {
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set your API key in the environment variables
};


export async function POST(req) {
try {
const {
model,
userInput,
saveOutput,
temperature,
maxTokens,
topP,
frequencyPenalty,
presencePenalty,
} = await req.json();


const openai = new OpenAI(configuration);

const response = await openai.completions.create({
  model: model,
  prompt: userInput,
  max_tokens: maxTokens,
  temperature: temperature,
  top_p: topP,
  frequency_penalty: frequencyPenalty,
  presence_penalty: presencePenalty,
});

const outputText = response.choices[0].text.trim();

if (saveOutput) {
  const filePath = path.join(process.cwd(), "saved_outputs.txt");
  const textToAppend = `
Model: ${model}
Prompt:
${userInput}

Output:
${outputText}
`;
fs.appendFileSync(filePath, textToAppend);
}

return NextResponse.json({ result: outputText });
} catch (error) {
console.error("Error in /api/completions route:", error);
return NextResponse.json(
{ error: "Error calling OpenAI API" },
{ status: 500 }
);
}
}