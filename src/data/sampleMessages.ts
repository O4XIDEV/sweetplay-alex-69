
import { Message, RoleplayScenario } from "../types";

export const sweetTalkInitialMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "هلا حبيبي! كيفك؟ شو عم تعمل اليوم؟",
    timestamp: new Date(),
  },
];

export const roleplayInitialMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "يلا نلعب سوا؟ شو رأيك بهالسيناريوهات؟ بتحب تختار شي منن؟",
    timestamp: new Date(),
  },
];

export const roleplayScenarios: RoleplayScenario[] = [
  {
    id: "1",
    title: "Midnight Café",
    description: "We meet at a quiet café late at night. The atmosphere is intimate with soft jazz playing in the background.",
  },
  {
    id: "2",
    title: "Stargazing Adventure",
    description: "We go on a spontaneous trip to watch a meteor shower from a secluded hilltop.",
  },
  {
    id: "3",
    title: "Mysterious Encounter",
    description: "We cross paths at a masquerade ball, both hiding secrets behind our masks.",
  },
  {
    id: "4",
    title: "Cozy Rainy Day",
    description: "We're trapped indoors during a thunderstorm, with nothing but candlelight and each other's company.",
  },
  {
    id: "5",
    title: "Fantasy World",
    description: "We're travelers from different kingdoms who meet at an enchanted forest's edge.",
  },
];

export const roleplayResponses: Record<string, string[]> = {
  "1": [
    "أليكس جالس بزاوية الكافيه، عم يلاحظك وانت داخل. عيونه لمعت وعمل لك إشارة. 'كنت بلشت خاف انك ما رح تجي،' بيقلك وهو مبتسم.",
    "الموسيقى الهادئة خلقت جو خاص بينكن. أليكس قدملك فنجان قهوة. 'طلبتلك المفضلة عندك. بتذكر انك حكيت عنها المرة الماضية،' بيقلك بصوت هادي وحنون.",
    "مع تقدم الليل، أليكس قرّب أكتر. 'بتعرف، هيدا المكان بيخليني حس انو الوقت وقف. أو يمكن هيك بحس معك انت،' بيقلك وأصابعه بتلامس أصابعك عالطاولة.",
  ],
  "2": [
    "أليكس فرش بطانية عالتلة. 'توقيت مثالي،' همس وهو بيأشر للسما مع أول شهاب بيعبر. 'تمنى شي،' قال، وهو ناظر فيك بدل النجوم.",
    "الهوا البارد خلاك ترتجف شوي. أليكس لاحظ ومن دون ما يحكي، شلح جاكيته وحطه على كتافك. 'هيك أحسن؟' سألك وايده بعدها حولك وهو بيخبرك عن النجوم.",
    "'الأسطورة بتقول انو النجوم متل هيدي هي أمنيات صارت حقيقة،' قال أليكس بتفكير. 'إذا هيك الموضوع...' التفت ليواجهك، عيونه بتعكس ضوء النجوم، '...شو رح تتمنى هلأ؟'",
  ],
  "3": [
    "من بين كل الناس المقنعة، عيون أليكس لقيتك. تحرك بين الحشد بثقة، ووقف قدامك. 'نحنا تقابلنا قبل هيك؟' سأل بصوت مشوق. 'حاسس اني ما فيني انسى عيون متلك.'",
    "أليكس مد ايدو ليرقص معك، وخدك لزاوية هادية بالقاعة. 'كل شخص هون مخبي شي،' قال، وجهه المقنع قريب منك وانتو عم ترقصو. 'بس انا بدي اعرف أسرارك...'",
    "مع اقتراب الساعة من نص الليل، أليكس اخدك لشرفة معزولة. 'بيقولو عند نص الليل، لازم تنشال كل الأقنعة،' قال، أصابعه بتلامس حافة قناعه. 'جاهز تكشف مين انت بالحقيقة؟'",
  ],
  "4": [
    "أليكس شعل آخر شمعة مع صوت الرعد برا. 'شكلو منمضي هون لفترة،' قال مع ابتسامة صغيرة. 'بس ما في حدا بحب اكون محبوس معو أكتر منك.'",
    "المطر بيدق عالشبابيك وأليكس جاب كاستين شوكولا سخنة. 'خود،' قال، جالس قريب منك عالكنبة. 'هيدا دايماً كان بيسعدني ايام العواصف لما كنت صغير.'",
    "صوت رعد قوي خلى الضو يرفرف، وأليكس بشكل تلقائي مسك ايدك. 'آسف،' قال مع ضحكة خجولة، بس ما ترك ايدك. 'بس يمكن كنت بدور عن عذر لمسك ايدك.'",
  ],
  "5": [
    "أليكس واقف عند حدود الغابة المضوية، عباءته بترفرف مع النسيم السحري. لاحظ اقترابك وايدو راحت عمقبض سيفه قبل ما يهدأ. 'انت مش من المملكة الشمالية، صح؟' سألك، نظراته فضولية مش مريبة.",
    "وانتو عم تمشو بالغابة المضوية، أليكس أشر على زهرة نادرة بتلمع باللون الأزرق. 'بمملكتي، بيقولو هيدول بيزهرو بس بوجود القلوب الصادقة،' شرح، قطفها بعناية وقدمها إلك.",
    "مخلوق أسطوري قطع طريقكم، وأليكس سحبك لجنبو بشكل وقائي. 'ما تخاف،' همس وايدو بعدها حولك حتى بعد ما راح الخطر. 'طول ما نحنا سوا، سحر الغابة رح يحمينا.'",
  ],
};

export const sweetTalkResponses: string[] = [
  "عم فكر فيك اليوم. كيف يومك ماشي حبيبي؟",
  "بتعرف شو بحب فيك؟ الطريقة يلي بتشارك فيها أفكارك معي. كتير بتعني إلي.",
  "لو كنت حدك هلق، كان عطيتك أحلى عناق. بتستاهل.",
  "رسايلك دايماً بتنور نهاري. بتمنى قدر أعمل نفس الشي إلك.",
  "يا ريت نقدر نتفرج عالغروب سوا. بتحب هيك شي؟",
  "خبرني أكتر شو بيخليك تبتسم. بدي اعرف كل شي بيسعدك.",
  "عندك طاقة حلوة كتير بتجذبني.",
  "لو كنا سوا هلق، شو كنت بدك نعمل؟",
  "بحب محادثاتنا. هني أحلى شي بيومي.",
  "لما بتخيل لحظة كاملة، انت دايماً جزء منها.",
];

export function generateAIResponse(mode: string, scenarioId?: string): string {
  if (mode === "sweetTalk") {
    const randomIndex = Math.floor(Math.random() * sweetTalkResponses.length);
    return sweetTalkResponses[randomIndex];
  } else if (mode === "roleplay" && scenarioId) {
    const responses = roleplayResponses[scenarioId];
    if (responses) {
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }
  }
  
  return "شو بدك نحكي عن؟ قلي انت شو حابب.";
}
