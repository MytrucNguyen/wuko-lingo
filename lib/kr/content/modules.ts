import type { Module, Course } from "../types";
import {
  sixBasicVowels,
  yVowels,
  firstFourConsonants,
  buildFirstBlocks,
  fiveMoreConsonants,
  aspiratedConsonants,
  buildEveryBlock,
  alphabetCheckpoint,
} from "./lessons";

export const hangulBasics: Module = {
  id: "m1",
  slug: "hangul-basics",
  number: 1,
  title: "Hangul basics",
  blurb: "The alphabet. Vowels first, then consonants. By the end you can read every basic Korean letter.",
  estimatedMinutes: 78,
  lessons: [sixBasicVowels, yVowels, firstFourConsonants, buildFirstBlocks, fiveMoreConsonants, aspiratedConsonants, buildEveryBlock, alphabetCheckpoint],
};

export const koreanCourse: Course = {
  id: "kr",
  slug: "kr",
  language: "Korean",
  nativeName: "한국어",
  script: "한글",
  history: [
    "In 1443, King Sejong the Great looked at his people and noticed something painful. Most Koreans could not read. The writing system they used, borrowed from Chinese, took years to master, far too long for ordinary farmers, merchants, and women who had no time for years of study.",
    "So Sejong did something almost no king has ever done. He invented an entirely new alphabet, called Hangul (한글), designed to be learnable in a single morning. The shapes were not arbitrary. Each consonant mimics the position of the mouth and tongue when you say it. Each vowel comes from three philosophical symbols: heaven, earth, and human.",
    "It is the only major writing system in the world whose creation can be pinpointed to a specific date and a specific person. Linguists have called it one of the most rational alphabets ever made.",
    "You are about to learn it. Most people can read Korean within an hour.",
  ],
  modules: [hangulBasics],
};
