import type { AppLanguage } from "./localization";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: unknown) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  }
}

const localeMap: Record<AppLanguage, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
};

function getRecognitionConstructor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function isVoiceInputSupported(): boolean {
  return getRecognitionConstructor() !== null;
}

export function startVoiceInput(options: {
  language: AppLanguage;
  onTranscript: (text: string) => void;
  onError?: (message: string) => void;
  onEnd?: () => void;
}): { stop: () => void } {
  const RecognitionCtor = getRecognitionConstructor();

  if (!RecognitionCtor) {
    options.onError?.("Speech recognition is not supported in this browser.");
    return { stop: () => undefined };
  }

  const recognition = new RecognitionCtor();
  recognition.lang = localeMap[options.language];
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: unknown) => {
    const transcript =
      (event as { results?: ArrayLike<ArrayLike<{ transcript?: string }>> }).results?.[0]?.[0]
        ?.transcript ?? "";
    options.onTranscript(transcript.trim());
  };

  recognition.onerror = (event: { error: string }) => {
    options.onError?.(event.error);
  };

  recognition.onend = () => {
    options.onEnd?.();
  };

  recognition.start();

  return {
    stop: () => recognition.stop(),
  };
}
