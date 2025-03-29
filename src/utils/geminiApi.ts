
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = "AIzaSyDu_XsEvatLVkwuSAciWDzNOnWxNhWvFSs";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.95,
  topK: 64,
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
    return "لم أتمكن من إنشاء استجابة الآن. دعنا نواصل محادثتنا.";
  }
}

export async function generateResponseWithGemini(
  mode: string, 
  scenarioId?: string,
  conversation?: { role: string, content: string }[]
): Promise<string> {
  let prompt = "";
  const lastMessage = conversation && conversation.length > 0 ? conversation[conversation.length - 1].content : "مرحبا";
  
  if (mode === "sweetTalk") {
    prompt = `أنت أليكس، رفيق ذكاء اصطناعي مهتم. استجب بطريقة حلوة وعاطفية، ولكن محترمة. حافظ على استجابتك في 1-3 جمل باللغة العربية. المستخدم الخاص بك قال للتو: ${lastMessage}`;
  } else if (mode === "roleplay" && scenarioId) {
    prompt = `واصل سيناريو لعب الأدوار هذا بطريقة وصفية وجذابة. اكتب 2-3 جمل من منظور أليكس، تصف الإجراءات والعواطف والحوار باللغة العربية. اجعلها غامرة ورومانسية دون أن تكون صريحة. السيناريو: ${conversation && conversation.length > 0 ? conversation.map(msg => msg.content).join("\n") : "لقد التقينا للتو"}`;
  }
  
  try {
    return await generateScenarioWithGemini(prompt);
  } catch (error) {
    console.error("Error generating response with Gemini:", error);
    return "لم أتمكن من إنشاء استجابة الآن. دعنا نواصل محادثتنا.";
  }
}
