import type { Consonant } from "../types";

export const consonants: Record<string, Consonant> = {
  giyeok: {
    kind: "consonant",
    char: "ㄱ",
    romanization: "g/k",
    ipa: "/k/",
    mnemonicHook: "gun",
    mnemonicShape: "Looks like the corner of a gun barrel pointing down and to the right.",
    audioHint: "기역",
  },
  nieun: {
    kind: "consonant",
    char: "ㄴ",
    romanization: "n",
    ipa: "/n/",
    mnemonicHook: "nose",
    mnemonicShape: "Looks like an L. The tongue presses where the L's corner is.",
    audioHint: "니은",
  },
  mieum: {
    kind: "consonant",
    char: "ㅁ",
    romanization: "m",
    ipa: "/m/",
    mnemonicHook: "mouth",
    mnemonicShape: "A closed box, like lips pressed together to make the m sound.",
    audioHint: "미음",
  },
  siot: {
    kind: "consonant",
    char: "ㅅ",
    romanization: "s",
    ipa: "/s/",
    mnemonicHook: "sitting",
    mnemonicShape: "Two legs sitting down, slightly bent. The air hisses out between them.",
    audioHint: "시옷",
  },
};
