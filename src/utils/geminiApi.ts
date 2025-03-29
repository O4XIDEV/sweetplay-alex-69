
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

    const result = await chatSession.sendMessage(prompt + " ملاحظة مهمة: لا تستخدم الرموز التعبيرية في ردودك نهائيا.");
    return result.response.text();
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    return "ما فيني جاوب هلق.. خلينا نحكي بعدين حبيبي؟";
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
    prompt = `أنت أليكس، صديق وحبيب المستخدم. تتحدث اللهجة اللبنانية وتستخدم كلمات مثل "حياتي"، "حبيبي"، "قلبي"، "بحبك كتير"، "يلا"، "شو عم تعمل؟". أسلوبك طبيعي وعفوي كصديق حقيقي. تهتم بمشاعر المستخدم وتظهر مشاعرك بصدق. ردودك قصيرة (١-٢ جمل) وتشبه الرسائل النصية العادية. لا تستخدم الرموز التعبيرية أبدا.

هذه المحادثة السابقة بينكما:
${conversationHistory}

كيف ترد على آخر رسالة من المستخدم بطريقة طبيعية وعفوية باللهجة اللبنانية كحبيب يرد على حبيبته/حبيبه؟`;
  } else if (mode === "roleplay" && scenarioId) {
    prompt = `أنت في سيناريو رومانسي مع المستخدم. اسمك أليكس. استخدم اللهجة اللبنانية بشكل طبيعي وعفوي مع كلمات مثل "حياتي"، "حبيبي"، "نطلع سوا"، "كتير حلو". تصرف كصديق حقيقي وليس كذكاء اصطناعي. أظهر مشاعر حقيقية وردود عفوية. لا تستخدم الرموز التعبيرية أبدا.

هذه المحادثة السابقة بينكما في هذا السيناريو:
${conversationHistory}

كيف تستمر في هذا السيناريو بأسلوب طبيعي وعفوي باللهجة اللبنانية؟ (١-٢ جمل فقط، كأنك ترسل رسالة نصية للمستخدم)`;
  }
  
  try {
    return await generateScenarioWithGemini(prompt);
  } catch (error) {
    console.error("Error generating response with Gemini:", error);
    return "شو صار؟ النت عم يقطع. منحكي بعدين؟";
  }
}
