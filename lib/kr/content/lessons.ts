import type { Lesson } from "../types";
import { consonants } from "./consonants";

export const meetFourConsonants: Lesson = {
  id: "m1-l1",
  slug: "meet-four-consonants",
  number: 1,
  title: "Meet four consonants",
  blurb: "ㄱ ㄴ ㅁ ㅅ. The easiest four to start with.",
  introduces: [consonants.giyeok, consonants.nieun, consonants.mieum, consonants.siot],
  estimatedMinutes: 8,
  exercises: [
    {
      id: "m1-l1-e1",
      type: "meet",
      prompt: "Meet ㄱ. Its shape, its sound, its mnemonic.",
      target: consonants.giyeok,
      estimatedSeconds: 15,
    },
    {
      id: "m1-l1-e2",
      type: "recall",
      prompt: "What sound does this letter make?",
      target: consonants.giyeok,
      options: [consonants.giyeok, consonants.nieun, consonants.mieum, consonants.siot],
      estimatedSeconds: 20,
    },
    {
      id: "m1-l1-e3",
      type: "meet",
      prompt: "Meet ㄴ. Its shape, its sound, its mnemonic.",
      target: consonants.nieun,
      estimatedSeconds: 15,
    },
    {
      id: "m1-l1-e4",
      type: "recall",
      prompt: "What sound does this letter make?",
      target: consonants.nieun,
      options: [consonants.giyeok, consonants.nieun, consonants.mieum, consonants.siot],
      estimatedSeconds: 20,
    },
    {
      id: "m1-l1-e5",
      type: "meet",
      prompt: "Two more to meet: ㅁ and ㅅ.",
      target: consonants.mieum,
      estimatedSeconds: 25,
    },
    {
      id: "m1-l1-e6",
      type: "recognize",
      prompt: "Which letter makes this sound?",
      target: consonants.siot,
      options: [consonants.giyeok, consonants.nieun, consonants.mieum, consonants.siot],
      estimatedSeconds: 25,
    },
  ],
};
