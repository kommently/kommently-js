import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from "vue";

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

export const KommentlyEmbed = defineComponent({
  name: "KommentlyEmbed",
  props: {
    siteId: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      default: undefined
    },
    backgroundEnabled: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { attrs }) {
    const hostRef = ref(null);

    function renderLegacyEmbed() {
      if (!hostRef.value) return;

      const resolvedSiteId = String(props.siteId ?? "").trim();
      if (!resolvedSiteId) {
        hostRef.value.replaceChildren();
        return;
      }

      const resolvedSlug = props.slug == null ? "" : String(props.slug).trim();
      const resolvedBackgroundEnabled = normalizeBackgroundEnabled(props.backgroundEnabled);
      const src = resolveWidgetScriptUrl();

      const existingMount = document.getElementById(LEGACY_MOUNT_ID);
      if (existingMount && !hostRef.value.contains(existingMount)) {
        existingMount.remove();
      }

      const mountNode = document.createElement("div");
      mountNode.id = LEGACY_MOUNT_ID;
      const script = createScriptTag(src, resolvedSiteId, resolvedSlug, resolvedBackgroundEnabled);
      hostRef.value.replaceChildren(mountNode, script);
    }

    onMounted(() => {
      renderLegacyEmbed();
    });

    watch(
      () => [props.siteId, props.slug, props.backgroundEnabled],
      () => {
        renderLegacyEmbed();
      }
    );

    onBeforeUnmount(() => {
      if (!hostRef.value) return;
      hostRef.value.replaceChildren();
    });

    return () => h("div", { ...attrs, ref: hostRef });
  }
});
