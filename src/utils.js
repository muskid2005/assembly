import { words } from "./word.js";

export function randomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return { word: words[randomIndex].word, hint: words[randomIndex].hint };
}

export function getFarewellText(language) {
  const options = [
    `Farewell, ${language}`,
    `Adios, ${language}`,
    `R.I.P., ${language}`,
    `we'll miss you, ${language}`,
    `oh no, not ${language}!`,
    `${language} bites the dust`,
    `Gone but not forgotten, ${language}`,
    `The end of ${language} as we know it`,
    `Off into the sunset, ${language}`,
    `${language}, it's been real`,
    `${language}, your watch has ended`,
    `${language} has left the building`,
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
