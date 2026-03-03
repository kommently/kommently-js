import { createEffect, onCleanup } from "solid-js";

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

function normalizeBackgroundEnabled(value) {
  if (value === false || value === "false" || value === "0") {
    return false;
  }
  if (value === true || value === "true" || value === "1") {
    return true;
  }
  return true;
}

function createScriptTag(src, siteId, slug, backgroundEnabled) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.dataset.kommentlyWidget = "1";
  script.dataset.siteId = siteId;
  script.dataset.backgroundEnabled = backgroundEnabled ? "true" : "false";
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

function unref(value) {
  return typeof value === "function" ? value() : value;
}

export function kommentlyEmbed(element, options) {
  createEffect(() => {
    const resolved = typeof options === "function" ? options() : options;
    const config = resolved && typeof resolved === "object" ? resolved : {};

    const siteId = String(unref(config.siteId) ?? "").trim();
    if (!siteId) {
      element.replaceChildren();
      return;
    }

    const slugValue = unref(config.slug);
    const slug = slugValue == null ? "" : String(slugValue).trim();
    const backgroundEnabled = normalizeBackgroundEnabled(unref(config.backgroundEnabled));
    const src = resolveWidgetScriptUrl();

    const existingMount = document.getElementById(LEGACY_MOUNT_ID);
    if (existingMount && !element.contains(existingMount)) {
      existingMount.remove();
    }

    const mountNode = document.createElement("div");
    mountNode.id = LEGACY_MOUNT_ID;
    const script = createScriptTag(src, siteId, slug, backgroundEnabled);
    element.replaceChildren(mountNode, script);
  });

  onCleanup(() => {
    element.replaceChildren();
  });
}
