"use client";
import { useState } from "react";

export default function Home() {
// Toggle for showing/hiding settings
const [showSettings, setShowSettings] = useState(true);

// Model & user prompt
const [model, setModel] = useState("babbage-002");
const [prompt, setPrompt] = useState("");
const [saveOutput, setSaveOutput] = useState(false);

// Additional completion parameters
const [temperature, setTemperature] = useState(0.7);
const [maxTokens, setMaxTokens] = useState(100);
const [topP, setTopP] = useState(1.0);
const [frequencyPenalty, setFrequencyPenalty] = useState(0.0);
const [presencePenalty, setPresencePenalty] = useState(0.0);

// Result state and loading indicator
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);

async function handleSubmit(e) {
e.preventDefault();
setLoading(true);
setResult("");

try {
  const response = await fetch("/api/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      userInput: prompt,
      saveOutput,
      temperature: parseFloat(temperature),
      maxTokens: parseInt(maxTokens),
      topP: parseFloat(topP),
      frequencyPenalty: parseFloat(frequencyPenalty),
      presencePenalty: parseFloat(presencePenalty),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Request failed");
  }

  const data = await response.json();
  setResult(data.result);
} catch (error) {
  console.error("Error in handleSubmit:", error);
  setResult("Error: " + error.message);
} finally {
  setLoading(false);
}
}

return (
<main>
<h1>OpenAI Legacy Completions</h1>

  <form onSubmit={handleSubmit}>
    {/* Toggle button to show/hide the Settings panel */}
    <button
      type="button"
      className="toggle-settings"
      onClick={() => setShowSettings(!showSettings)}
    >
      {showSettings ? "Hide Settings" : "Show Settings"}
    </button>

    {/* Collapsible Settings Box */}
    {showSettings && (
      <div className="settings-container">
        {/* Model selection */}
        <div>
          <label htmlFor="model">Model:</label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="babbage-002">babbage-002</option>
            <option value="davinci-002">davinci-002</option>
            <option value="gpt-3.5-turbo-instruct">
              gpt-3.5-turbo-instruct
            </option>
          </select>
        </div>

        {/* Temperature */}
        <div>
          <label htmlFor="temperature">
            Temperature: {temperature}
          </label>
          <input
            type="range"
            id="temperature"
            min="0"
            max="1"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>

        {/* Max Tokens */}
        <div>
          <label htmlFor="maxTokens">
            Max Tokens: {maxTokens}
          </label>
          <input
            type="range"
            id="maxTokens"
            min="1"
            max="2048"
            step="1"
            value={maxTokens}
            onChange={(e) => setMaxTokens(e.target.value)}
          />
        </div>

        {/* Top P */}
        <div>
          <label htmlFor="topP">Top P: {topP}</label>
          <input
            type="range"
            id="topP"
            min="0"
            max="1"
            step="0.01"
            value={topP}
            onChange={(e) => setTopP(e.target.value)}
          />
        </div>

        {/* Frequency Penalty */}
        <div>
          <label htmlFor="freqPen">
            Frequency Penalty: {frequencyPenalty}
          </label>
          <input
            type="range"
            id="freqPen"
            min="0"
            max="2"
            step="0.1"
            value={frequencyPenalty}
            onChange={(e) => setFrequencyPenalty(e.target.value)}
          />
        </div>

        {/* Presence Penalty */}
        <div>
          <label htmlFor="presPen">
            Presence Penalty: {presencePenalty}
          </label>
          <input
            type="range"
            id="presPen"
            min="0"
            max="2"
            step="0.1"
            value={presencePenalty}
            onChange={(e) => setPresencePenalty(e.target.value)}
          />
        </div>

        {/* Checkbox for saving output */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="saveOutput"
            checked={saveOutput}
            onChange={(e) => setSaveOutput(e.target.checked)}
          />
          <label htmlFor="saveOutput">Save output to file</label>
        </div>
      </div>
    )}

    {/* Prompt textarea */}
    <div>
      <label htmlFor="prompt">Enter Prompt:</label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Your prompt here..."
      />
    </div>

    {/* Submit Button */}
    <button type="submit" disabled={loading}>
      {loading ? "Generating..." : "Generate"}
    </button>
  </form>

  {/* Output */}
  {result && (
    <div id="outputSection">
      <h2>Output:</h2>
      <pre>{result}</pre>
    </div>
  )}
</main>
);
}