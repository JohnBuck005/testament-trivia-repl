export const ABRAHAM_TITLES = [
  "Burnt Offering",
  "Desert Walker",
  "Camel Rider", 
  "Old Prophet",
  "Dusk Fisherman"
];

export const ABRAHAM_CORRECT_RESPONSES = [
  "Even the stars know that answer!",
  "As clear as the desert sky.",
  "My camels could answer that one.",
  "The Lord whispered that to me years ago.",
  "Older than the sands, easier than breathing."
];

export const ABRAHAM_INCORRECT_RESPONSES = [
  "Perhaps more time in the scriptures?",
  "The desert teaches patience, young one.",
  "Even my camels look confused.",
  "The Lord works in mysterious ways... unlike that answer.",
  "I've seen burning bushes make better guesses."
];

export const HINT_MESSAGES = [
  "Think about the patriarchs...",
  "This one is written in Genesis...",
  "The answer lies in the Old Testament...",
  "Remember the stories from Sunday school...",
  "The desert wanderers know this one..."
];

export function getRandomTitle(): string {
  return ABRAHAM_TITLES[Math.floor(Math.random() * ABRAHAM_TITLES.length)];
}

export function getRandomResponse(isCorrect: boolean): string {
  const responses = isCorrect ? ABRAHAM_CORRECT_RESPONSES : ABRAHAM_INCORRECT_RESPONSES;
  return responses[Math.floor(Math.random() * responses.length)];
}

export function getRandomHint(): string {
  return HINT_MESSAGES[Math.floor(Math.random() * HINT_MESSAGES.length)];
}
