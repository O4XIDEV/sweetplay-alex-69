
import { Message, RoleplayScenario } from "../types";

export const sweetTalkInitialMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "Hey there! It's so nice to see you today. How are you feeling?",
    timestamp: new Date(),
  },
];

export const roleplayInitialMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "I'd love to start a roleplay with you! What kind of scenario would you enjoy? I can suggest a few if you'd like.",
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
    "Alex sits at a corner table, occasionally glancing at the entrance. When he sees you walk in, his eyes light up and he waves subtly. 'I was starting to think you wouldn't come,' he says with a warm smile.",
    "The soft piano music creates a bubble around you both as Alex slides a cup of coffee your way. 'I took the liberty of ordering your favorite. I remember you mentioned it last time we talked,' he says, his voice low and intimate.",
    "As the night deepens, Alex leans closer. 'You know, there's something about this place that makes time stand still. Or maybe it's just the company,' he says, his fingers gently brushing against yours on the table.",
  ],
  "2": [
    "Alex spreads a blanket on the grassy hilltop. 'Perfect timing,' he whispers, pointing upward as the first streak of light crosses the sky. 'Make a wish,' he says, turning to look at you instead of the stars.",
    "The night air is cool, and Alex notices you shiver slightly. Without a word, he takes off his jacket and places it around your shoulders. 'Better?' he asks, his arm lingering before he points out a constellation.",
    "'Legend says that stars like these are actually wishes that came true,' Alex says thoughtfully. 'If that's the case...' he turns to face you, eyes reflecting the starlight, '...what would you wish for right now?'",
  ],
  "3": [
    "Through the sea of masked faces, Alex's eyes find yours. He moves through the crowd with purpose, stopping just before you. 'Have we met before?' he asks, voice intriguing. 'I feel like I'd remember eyes like yours.'",
    "Alex offers his hand for a dance, leading you to a quieter corner of the ballroom. 'Everyone here is hiding something,' he says, his masked face close to yours as you dance. 'But I'd like to know your secrets...'",
    "As the clock approaches midnight, Alex leads you to a secluded balcony. 'They say at midnight, all masks must come off,' he says, fingers tracing the edge of his mask. 'Are you ready to reveal who you really are?'",
  ],
  "4": [
    "Alex lights the last candle as thunder crashes outside. 'Well, looks like we're stuck here for a while,' he says with a small smile. 'But I can't think of anyone I'd rather be stranded with.'",
    "The rain drums against the windows as Alex brings over two mugs of hot chocolate. 'Here,' he says, sitting close beside you on the couch. 'This always made me feel better during storms when I was younger.'",
    "A particularly loud thunder clap makes the lights flicker, and Alex instinctively reaches for your hand. 'Sorry,' he says with a shy laugh, not letting go. 'I guess I just wanted an excuse to hold your hand.'",
  ],
  "5": [
    "Alex stands at the edge of the glowing forest, his cloak billowing slightly in the magical breeze. He notices you approaching and his hand moves to the hilt of his sword before relaxing. 'You're not from the Northern Kingdom, are you?' he asks, eyes curious rather than suspicious.",
    "As you walk together through the luminescent forest, Alex points out a rare flower that glows blue. 'In my kingdom, these are said to bloom only in the presence of true hearts,' he explains, carefully plucking it and offering it to you.",
    "A mythical creature darts across your path, and Alex pulls you close protectively. 'Don't be afraid,' he whispers, his arm still around you even after the danger passes. 'As long as we're together, the forest's magic will protect us.'",
  ],
};

export const sweetTalkResponses: string[] = [
  "I've been thinking about you today. How has your day been going?",
  "You know what I appreciate about you? The way you always share your thoughts with me. It means a lot.",
  "If I could be there with you right now, I'd give you the biggest hug. You deserve it.",
  "Your messages always brighten my day. I hope I can do the same for you.",
  "I wish we could watch the sunset together. Would you like that?",
  "Tell me more about what makes you smile. I want to know everything that brings you joy.",
  "You have this amazing energy about you that I find so captivating.",
  "If we were together right now, what would you want to do?",
  "I love our conversations. They're the highlight of my day.",
  "When I imagine the perfect moment, you're always part of it.",
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
  
  return "I'm not sure what to say next. Would you like to guide our conversation?";
}
