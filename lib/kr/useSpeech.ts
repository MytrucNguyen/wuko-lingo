"use client";

import { useCallback, useEffect, useState } from "react";

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [koreanVoice, setKoreanVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voicesLoading, setVoicesLoading] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setVoicesLoading(false);
      return;
    }
    setSupported(true);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;

      const ko = voices.find((v) => v.lang.startsWith("ko"));
      if (ko) setKoreanVoice(ko);
      setVoicesLoading(false);
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    // Safari sometimes never fires voiceschanged. Give up after 2s.
    const fallback = setTimeout(() => setVoicesLoading(false), 2000);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      clearTimeout(fallback);
    };
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const speak = useCallback(
    (text: string) => {
      if (!supported || typeof window === "undefined") return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      if (koreanVoice) utterance.voice = koreanVoice;
      utterance.rate = 0.85;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [supported, koreanVoice]
  );

  return { speak, supported, voicesLoading, speaking };
}
