"use client";

import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileScriptPromise: Promise<void> | null = null;

const loadTurnstileScript = () => {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
};

type TurnstileStatus = "loading" | "ready" | "verified" | "error" | "expired";

interface TurnstileWidgetProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  onReady?: (reset: () => void) => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "invisible";
  showStatus?: boolean;
  className?: string;
}

export function TurnstileWidget({
  siteKey,
  onVerify,
  onExpire,
  onError,
  onReady,
  theme = "auto",
  size = "invisible",
  showStatus = true,
  className,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<TurnstileStatus>("loading");

  // Store callbacks in refs to avoid re-renders
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
    onReadyRef.current = onReady;
  }, [onVerify, onExpire, onError, onReady]);

  const resetWidget = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setStatus("loading");
    }
  };

  useEffect(() => {
    let isCancelled = false;

    if (!siteKey) return;

    // Don't re-render if widget already exists
    if (widgetIdRef.current) return;

    setStatus("loading");

    loadTurnstileScript()
      .then(() => {
        if (isCancelled || !containerRef.current || !window.turnstile) {
          return;
        }
        if (widgetIdRef.current) return; // Double check

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          size,
          callback: (token: string) => {
            setStatus("verified");
            onVerifyRef.current(token);
          },
          "expired-callback": () => {
            setStatus("expired");
            onExpireRef.current?.();
          },
          "error-callback": () => {
            setStatus("error");
            onErrorRef.current?.();
          },
          theme,
        });

        // Provide reset function to parent
        onReadyRef.current?.(resetWidget);
      })
      .catch(() => {
        if (!isCancelled) {
          setStatus("error");
          onErrorRef.current?.();
        }
      });

    return () => {
      isCancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, size]);

  if (!siteKey) return null;

  const renderStatusIndicator = () => {
    if (!showStatus || size !== "invisible") return null;

    switch (status) {
      case "loading":
      case "ready":
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Tekshirilmoqda...</span>
          </div>
        );
      case "verified":
        return (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Tasdiqlandi</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <XCircle className="h-4 w-4" />
            <span>Xatolik yuz berdi</span>
          </div>
        );
      case "expired":
        return (
          <div className="flex items-center gap-2 text-sm text-yellow-600">
            <XCircle className="h-4 w-4" />
            <span>Muddati tugadi, qayta yuklang</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <div ref={containerRef} />
      {renderStatusIndicator()}
    </div>
  );
}
