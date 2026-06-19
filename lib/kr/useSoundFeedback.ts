"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "wuko:sound-feedback";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSoundFeedback() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    if (prefersReducedMotion()) {
      setEnabled(false);
      return;
    }

    // Respect user's stored preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "off") setEnabled(false);
  }, []);

  const ensureContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return null;
      audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (frequencies: number[], durationMs: number, type: OscillatorType = "sine") => {
      if (!enabled) return;
      const ctx = ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const durationSec = durationMs / 1000;

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        // ADSR-style envelope: quick attack, gentle release
        gain.gain.setValueAtTime(0, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.05 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + durationSec);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + durationSec);
      });
    },
    [enabled, ensureContext]
  );

  const playCorrect = useCallback(() => {
    // Two-tone ascending chime (C5 → E5) — pleasant, non-verbal
    playTone([523.25, 659.25], 240, "sine");
  }, [playTone]);

  const playWrong = useCallback(() => {
    // Descending two-tone buzz (A3 → E3) — soft, not harsh
    playTone([220, 164.81], 280, "triangle");
  }, [playTone]);

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      }
      return next;
    });
  }, []);

  return { playCorrect, playWrong, enabled, toggleEnabled };
}
