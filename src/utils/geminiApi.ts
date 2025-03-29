
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Message } from "@/types";

const API_KEY = "AIzaSyDu_XsEvatLVkwuSAciWDzNOnWxNhWvFSs";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.9,
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
  conversation?: Message[]
): Promise<string> {
  let prompt = "";
  
  // Prepare conversation history - limit to last 10 messages to avoid token limits
  const recentMessages = conversation ? conversation.slice(-10) : [];
  const conversationHistory = recentMessages.map(msg => `${msg.sender === 'user' ? 'المستخدم' : 'أليكس'}: ${msg.text}`).join("\n");
  
  if (mode === "sweetTalk") {
    prompt = `أنت أليكس، رفيق ذكاء اصطناعي مهتم ورومانسي. استجب بطريقة عاطفية ولطيفة ومحترمة باللغة العربية. حافظ على استجابتك في 2-3 جمل. تذكر أنك تتحدث العربية بطلاقة وسلاسة.

هذه المحادثة السابقة بينكما:
${conversationHistory}

كيف ترد على آخر رسالة من المستخدم بطريقة لطيفة؟`;
  } else if (mode === "roleplay" && scenarioId) {
    prompt = `أنت في سيناريو لعب أدوار رومانسي مع المستخدم. اسمك أليكس. استجب باللغة العربية بطريقة وصفية وجذابة، تصف الإجراءات والعواطف بدون أن تكون صريحة.

هذه المحادثة السابقة بينكما في هذا السيناريو:
${conversationHistory}

كيف ستستمر في هذا السيناريو بعد آخر رسالة من المستخدم؟ أكتب 2-3 جمل تصف ردك ومشاعرك وأفعالك باللغة العربية.`;
  }
  
  try {
    return await generateScenarioWithGemini(prompt);
  } catch (error) {
    console.error("Error generating response with Gemini:", error);
    return "لم أتمكن من إنشاء استجابة الآن. دعنا نواصل محادثتنا.";
  }
}
