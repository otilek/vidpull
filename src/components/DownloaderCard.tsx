import { useState, useRef } from "react";
import { Download, Link2, X, AlertCircle, ChevronDown } from "lucide-react";
import { PlatformBadge, detectPlatform, type Platform } from "./PlatformBadge";

type Quality = "4K" | "1080p" | "720p" | "480p" | "360p" | "Audio Only";
type Format = "MP4" | "WEBM" | "MP3";

const QUALITIES: Quality[] = ["4K", "1080p", "720p", "480p", "360p", "Audio Only"];
const FORMATS: Format[] = ["MP4", "WEBM", "MP3"];

type DownloadState = "idle" | "fetching" | "ready" | "downloading" | "done" | "error";

export function DownloaderCard() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<Platform>(null);
  const [quality, setQuality] = useState<Quality>("1080p");
  const [format, setFormat] = useState<Format>("MP4");
  const [state, setState] = useState<DownloadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    setPlatform(detectPlatform(val));
    if (state !== "idle") setState("idle");
  };

  const handleClear = () => {
    setUrl("");
    setPlatform(null);
    setState("idle");
    setErrorMsg("");
    inputRef.current?.focus();
  };

  const handleFetch = () => {
    if (!url.trim()) {
      setErrorMsg("Please paste a valid video URL.");
      setState("error");
      return;
    }
    if (!platform) {
      setErrorMsg("URL not recognized. We support YouTube, LinkedIn, Facebook, and Instagram.");
      setState("error");
      return;
    }
    setState("fetching");
    // Simulate fetch metadata
    setTimeout(() => setState("ready"), 1800);
  };

  const handleDownload = () => {
    setState("downloading");
    setTimeout(() => setState("done"), 2200);
  };

  const isAudioOnly = quality === "Audio Only";
  const effectiveFormat = isAudioOnly ? "MP3" : format;

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 w-full max-w-2xl mx-auto animate-slide-up">
      {/* URL Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
          Paste your video URL
        </label>
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Link2
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
              placeholder="https://www.youtube.com/watch?v=..."
              className="input-dark w-full rounded-xl pl-9 pr-10 py-3 text-sm font-mono"
              style={{ fontSize: "0.8rem" }}
            />
            {url && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={handleFetch}
            disabled={state === "fetching" || state === "ready" || state === "downloading"}
            className="btn-primary rounded-xl px-5 py-3 font-semibold text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === "fetching" ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin inline-block" />
                Fetching…
              </span>
            ) : "Analyze"}
          </button>
        </div>

        {/* Platform Badge */}
        {platform && (
          <div className="mt-2">
            <PlatformBadge platform={platform} size="sm" />
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="mt-2 flex items-center gap-2 text-sm animate-fade-in" style={{ color: "hsl(var(--destructive))" }}>
            <AlertCircle size={14} />
            {errorMsg}
          </div>
        )}
      </div>

      {/* Options - shown when ready */}
      {(state === "ready" || state === "done" || state === "downloading") && (
        <div className="animate-slide-up space-y-5 mb-6">
          {/* Mock video info */}
          <div
            className="rounded-xl p-4 flex gap-3 items-start"
            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
          >
            <div className="w-20 h-12 rounded-lg shimmer flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded shimmer w-3/4" />
              <div className="h-2.5 rounded shimmer w-1/2" />
              <div className="h-2.5 rounded shimmer w-1/3" />
            </div>
          </div>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium mb-2.5" style={{ color: "hsl(var(--muted-foreground))" }}>
              Quality
            </label>
            <div className="flex flex-wrap gap-2">
              {QUALITIES.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`quality-chip ${quality === q ? "selected" : ""}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          {!isAudioOnly && (
            <div>
              <label className="block text-sm font-medium mb-2.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                Format
              </label>
              <div className="flex gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`quality-chip ${format === f ? "selected" : ""}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Download Button */}
      {(state === "ready" || state === "downloading" || state === "done") && (
        <button
          onClick={handleDownload}
          disabled={state === "downloading" || state === "done"}
          className="btn-primary w-full rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {state === "downloading" ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              Preparing Download…
            </>
          ) : state === "done" ? (
            <>
              ✓ Download Ready — {quality} {effectiveFormat}
            </>
          ) : (
            <>
              <Download size={16} />
              Download {quality} {effectiveFormat}
            </>
          )}
        </button>
      )}

      {/* Done note */}
      {state === "done" && (
        <p className="text-center text-xs mt-3 animate-fade-in" style={{ color: "hsl(var(--muted-foreground))" }}>
          🎉 Your file is ready. Connect a backend to enable real downloads.
        </p>
      )}
    </div>
  );
}
