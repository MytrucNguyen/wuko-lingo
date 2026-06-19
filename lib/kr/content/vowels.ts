import type { Vowel } from "../types";

export const vowels: Record<string, Vowel> = {
  a: {
    kind: "vowel",
    char: "ㅏ",
    romanization: "a",
    ipa: "/a/",
    orientation: "vertical",
    mnemonicHook: "ah",
    mnemonicShape: "A vertical line with a tab pointing right. Mouth opens wide and says ah.",
    audioHint: "아",
  },
  i: {
    kind: "vowel",
    char: "ㅣ",
    romanization: "i",
    ipa: "/i/",
    orientation: "vertical",
    mnemonicHook: "ee",
    mnemonicShape: "A single tall vertical line. Lips pull wide for the ee sound.",
    audioHint: "이",
  },
};
