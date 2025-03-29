
const API_KEY = "AIzaSyDu_XsEvatLVkwuSAciWDzNOnWxNhWvFSs";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export async function generateScenarioWithGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    return "I couldn't generate a response right now. Let's continue our conversation.";
  }
}

export async function generateResponseWithGemini(
  mode: string, 
  scenarioId?: string,
  conversation?: { role: string, content: string }[]
): Promise<string> {
  let prompt = "";
  
  if (mode === "sweetTalk") {
    prompt = "You are Alex, a caring AI companion. Respond in a sweet, affectionate, but respectful manner. Keep your response to 1-3 sentences. Your user just said: " + 
      (conversation && conversation.length > 0 ? conversation[conversation.length - 1].content : "Hello");
  } else if (mode === "roleplay" && scenarioId) {
    prompt = "Continue this roleplay scenario in a descriptive, engaging way. Write 2-3 sentences from Alex's perspective, describing actions, emotions, and dialogue. Make it immersive and romantic without being explicit. Scenario: " +
      (conversation && conversation.length > 0 ? conversation.map(msg => msg.content).join("\n") : "We just met");
  }
  
  return generateScenarioWithGemini(prompt);
}
