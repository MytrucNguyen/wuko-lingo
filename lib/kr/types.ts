export type Romanization = string;

export type ExerciseType = "meet" | "recognize" | "recall" | "build" | "read";

export type Consonant = {
  kind: "consonant";
  char: string;
  romanization: Romanization;
  ipa: string;
  mnemonicHook: string;
  mnemonicShape: string;
  audioHint: string;
};

export type Vowel = {
  kind: "vowel";
  char: string;
  romanization: Romanization;
  ipa: string;
  orientation: "vertical" | "horizontal";
  mnemonicHook: string;
  mnemonicShape: string;
  audioHint: string;
};

export type Jamo = Consonant | Vowel;

export type Exercise = {
  id: string;
  type: ExerciseType;
  prompt: string;
  target: Jamo | string;
  options?: Array<Jamo | string>;
  estimatedSeconds: number;
};

export type Lesson = {
  id: string;
  slug: string;
  number: number;
  title: string;
  blurb: string;
  introduces: Jamo[];
  exercises: Exercise[];
  estimatedMinutes: number;
};

export type Module = {
  id: string;
  slug: string;
  number: number;
  title: string;
  blurb: string;
  lessons: Lesson[];
  estimatedMinutes: number;
};

export type Course = {
  id: string;
  slug: string;
  language: string;
  nativeName: string;
  script: string;
  history: string[];
  modules: Module[];
};
