
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = "AIzaSyDu_XsEvatLVkwuSAciWDzNOnWxNhWvFSs";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
};

export async function generateScenarioWithGemini(prompt: string): Promise<string> {
  try {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
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
