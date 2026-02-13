import { createElement, useEffect, useRef } from "react";

const DEFAULT_WIDGET_SCRIPT_URL = "https://cdn.kommently.com/js/widget.js";
const LEGACY_MOUNT_ID = "comments-widget";

function normalizeScriptUrl(value) {
  return String(value ?? "").trim();
}

function resolveWidgetScriptUrl(overrideUrl) {
  const devConfig = window.__KOMMENTLY_DEV__ ?? {};
  return (
    normalizeScriptUrl(overrideUrl) ||
    normalizeScriptUrl(devConfig.widgetScriptUrl) ||
    normalizeScriptUrl(window.__KOMMENTLY_WIDGET_SCRIPT_URL__) ||
    DEFAULT_WIDGET_SCRIPT_URL
  );
}

function createScriptTag(src, siteId, slug) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.dataset.kommentlyWidget = "1";
  script.dataset.siteId = siteId;
  if (slug) {
    script.dataset.slug = slug;
  }
  return script;
}

export function loadKommentlyWidgetScript(overrideUrl) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve();
  }

  const src = resolveWidgetScriptUrl(overrideUrl);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error(`Failed to load Kommently widget script from ${src}`)), {
      once: true
    });
    document.head.appendChild(script);
  });
}

export function KommentlyEmbed({ siteId, slug, className, style }) {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) {
      return undefined;
    }

    const host = hostRef.current;
    const resolvedSiteId = String(siteId ?? "").trim();
    if (!resolvedSiteId) {
      host.replaceChildren();
      delete host.dataset.kommentlySiteId;
      delete host.dataset.kommentlySlug;
      return undefined;
    }

    const resolvedSlug = slug == null ? "" : String(slug).trim();
    const previousSiteId = host.dataset.kommentlySiteId ?? "";
    const previousSlug = host.dataset.kommentlySlug ?? "";
    const existingScript = host.querySelector("script[data-site-id]");
    if (existingScript && previousSiteId === resolvedSiteId && previousSlug === resolvedSlug) {
      return undefined;
    }

    const src = resolveWidgetScriptUrl();

    const existingMount = document.getElementById(LEGACY_MOUNT_ID);
    if (existingMount && !host.contains(existingMount)) {
      existingMount.remove();
    }

    const mountNode = document.createElement("div");
    mountNode.id = LEGACY_MOUNT_ID;
    const script = createScriptTag(src, resolvedSiteId, resolvedSlug);
    host.replaceChildren(mountNode, script);
    host.dataset.kommentlySiteId = resolvedSiteId;
    host.dataset.kommentlySlug = resolvedSlug;
    return undefined;
  }, [siteId, slug]);

  return createElement("div", { ref: hostRef, className, style });
}
