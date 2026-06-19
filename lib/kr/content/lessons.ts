import type { Lesson } from "../types";
import { consonants } from "./consonants";
import { vowels } from "./vowels";

const FIRST_RECALL_NOTE =
  "Now we test what stuck. You will see a letter and pick the sound it makes. If you miss one, it will come back later in this lesson so you can try again. No pressure.";

export const sixBasicVowels: Lesson = {
  id: "m1-l1",
  slug: "six-basic-vowels",
  number: 1,
  title: "The six basic vowels",
  blurb: "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ. The foundation of every Korean syllable.",
  introduces: [vowels.a, vowels.eo, vowels.o, vowels.u, vowels.eu, vowels.i],
  estimatedMinutes: 12,
  exercises: [
    // Phase 1: Meet all six
    { id: "m1-l1-e1", type: "meet", prompt: "Meet ㅏ. Sound, shape, and how to make it.", target: vowels.a, estimatedSeconds: 25 },
    { id: "m1-l1-e2", type: "meet", prompt: "Meet ㅓ. The mirror of ㅏ.", target: vowels.eo, estimatedSeconds: 25 },
    { id: "m1-l1-e3", type: "meet", prompt: "Meet ㅗ. Now the line points up.", target: vowels.o, estimatedSeconds: 25 },
    { id: "m1-l1-e4", type: "meet", prompt: "Meet ㅜ. The mirror of ㅗ.", target: vowels.u, estimatedSeconds: 25 },
    { id: "m1-l1-e5", type: "meet", prompt: "Meet ㅡ. Just a flat line.", target: vowels.eu, estimatedSeconds: 20 },
    { id: "m1-l1-e6", type: "meet", prompt: "Meet ㅣ. The simplest vowel of all.", target: vowels.i, estimatedSeconds: 20 },
    // Phase 2: Paired retrieval
    {
      id: "m1-l1-e7",
      type: "recall",
      prompt: "What sound does this letter make?",
      target: vowels.a,
      options: [vowels.a, vowels.eo],
      estimatedSeconds: 15,
      note: FIRST_RECALL_NOTE,
    },
    { id: "m1-l1-e8", type: "recall", prompt: "What sound does this letter make?", target: vowels.o, options: [vowels.o, vowels.u], estimatedSeconds: 15 },
    { id: "m1-l1-e9", type: "recall", prompt: "What sound does this letter make?", target: vowels.eu, options: [vowels.eu, vowels.i], estimatedSeconds: 15 },
    // Phase 3: Interleaved retrieval
    { id: "m1-l1-e10", type: "recognize", prompt: "Which letter makes this sound?", target: vowels.eo, options: [vowels.a, vowels.eo, vowels.o, vowels.u, vowels.eu, vowels.i], estimatedSeconds: 20 },
    { id: "m1-l1-e11", type: "recognize", prompt: "Which letter makes this sound?", target: vowels.u, options: [vowels.a, vowels.eo, vowels.o, vowels.u, vowels.eu, vowels.i], estimatedSeconds: 20 },
    { id: "m1-l1-e12", type: "recognize", prompt: "Which letter makes this sound?", target: vowels.i, options: [vowels.a, vowels.eo, vowels.o, vowels.u, vowels.eu, vowels.i], estimatedSeconds: 20 },
  ],
};

export const yVowels: Lesson = {
  id: "m1-l2",
  slug: "y-vowels",
  number: 2,
  title: "The y-vowels",
  blurb: "ㅑ ㅕ ㅛ ㅠ. Add a dash, add a y sound.",
  introduces: [vowels.ya, vowels.yeo, vowels.yo, vowels.yu],
  estimatedMinutes: 9,
  exercises: [
    {
      id: "m1-l2-e1",
      type: "meet",
      prompt: "Meet ㅑ. ㅏ with one extra dash.",
      target: vowels.ya,
      estimatedSeconds: 25,
      note: "Korean has a clever pattern. Add an extra dash to any basic vowel and you get its y-version. ㅏ becomes ㅑ. ㅓ becomes ㅕ. Same direction, just doubled. The extra dash means the sound starts with a y.",
    },
    { id: "m1-l2-e2", type: "meet", prompt: "Meet ㅕ. ㅓ with one extra dash.", target: vowels.yeo, estimatedSeconds: 20 },
    { id: "m1-l2-e3", type: "meet", prompt: "Meet ㅛ. ㅗ with one extra dash.", target: vowels.yo, estimatedSeconds: 20 },
    { id: "m1-l2-e4", type: "meet", prompt: "Meet ㅠ. ㅜ with one extra dash.", target: vowels.yu, estimatedSeconds: 20 },
    {
      id: "m1-l2-e5",
      type: "recall",
      prompt: "What sound does this letter make?",
      target: vowels.ya,
      options: [vowels.ya, vowels.yeo],
      estimatedSeconds: 15,
      note: FIRST_RECALL_NOTE,
    },
    { id: "m1-l2-e6", type: "recall", prompt: "What sound does this letter make?", target: vowels.yo, options: [vowels.yo, vowels.yu], estimatedSeconds: 15 },
    { id: "m1-l2-e7", type: "recognize", prompt: "Which letter makes this sound?", target: vowels.yeo, options: [vowels.ya, vowels.yeo, vowels.yo, vowels.yu], estimatedSeconds: 20 },
    { id: "m1-l2-e8", type: "recognize", prompt: "Which letter makes this sound?", target: vowels.yu, options: [vowels.ya, vowels.yeo, vowels.yo, vowels.yu], estimatedSeconds: 20 },
  ],
};

export const firstFourConsonants: Lesson = {
  id: "m1-l3",
  slug: "first-four-consonants",
  number: 3,
  title: "First four consonants",
  blurb: "ㄱ ㄴ ㅁ ㅅ. Now that you know the vowels, the consonants click into place.",
  introduces: [consonants.giyeok, consonants.nieun, consonants.mieum, consonants.siot],
  estimatedMinutes: 10,
  exercises: [
    {
      id: "m1-l3-e1",
      type: "meet",
      prompt: "Meet ㄱ. You will hear it as 가.",
      target: consonants.giyeok,
      estimatedSeconds: 25,
      note: "Korean consonants do not stand alone in speech. To hear ㄱ you pair it with a vowel: ㄱ + ㅏ = 가. That is why we learned the vowels first. The consonant is the start of the sound, not the whole sound.",
    },
    { id: "m1-l3-e2", type: "meet", prompt: "Meet ㄴ. You will hear it as 나.", target: consonants.nieun, estimatedSeconds: 20 },
    { id: "m1-l3-e3", type: "meet", prompt: "Meet ㅁ. Hear it as 마.", target: consonants.mieum, estimatedSeconds: 20 },
    { id: "m1-l3-e4", type: "meet", prompt: "Meet ㅅ. Hear it as 사.", target: consonants.siot, estimatedSeconds: 20 },
    {
      id: "m1-l3-e5",
      type: "recall",
      prompt: "What sound does this letter make?",
      target: consonants.giyeok,
      options: [consonants.giyeok, consonants.nieun],
      estimatedSeconds: 15,
      note: FIRST_RECALL_NOTE,
    },
    { id: "m1-l3-e6", type: "recall", prompt: "What sound does this letter make?", target: consonants.mieum, options: [consonants.mieum, consonants.siot], estimatedSeconds: 15 },
    { id: "m1-l3-e7", type: "recognize", prompt: "Which letter makes this sound?", target: consonants.nieun, options: [consonants.giyeok, consonants.nieun, consonants.mieum, consonants.siot], estimatedSeconds: 20 },
    { id: "m1-l3-e8", type: "recognize", prompt: "Which letter makes this sound?", target: consonants.siot, options: [consonants.giyeok, consonants.nieun, consonants.mieum, consonants.siot], estimatedSeconds: 20 },
  ],
};
