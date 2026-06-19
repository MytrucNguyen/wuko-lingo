"use client";

import { useCallback, useEffect, useState } from "react";

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [koreanVoice, setKoreanVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    setSupported(true);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const ko = voices.find((v) => v.lang.startsWith("ko"));
      if (ko) setKoreanVoice(ko);
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!supported || typeof window === "undefined") return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      if (koreanVoice) utterance.voice = koreanVoice;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    },
    [supported, koreanVoice]
  );

  return { speak, supported };
}
