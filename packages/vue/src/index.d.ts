import type { CSSProperties, DefineComponent } from "vue";

export interface KommentlyDevConfig {
  apiBaseUrl?: string;
  widgetScriptUrl?: string;
}

declare global {
  interface Window {
    __KOMMENTLY_DEV__?: KommentlyDevConfig;
    __KOMMENTLY_WIDGET_SCRIPT_URL__?: string;
  }
}

export interface KommentlyEmbedProps {
  siteId: string;
  slug?: string;
  backgroundEnabled?: boolean;
  class?: string;
  style?: CSSProperties | string | Record<string, string | number>;
}

export function loadKommentlyWidgetScript(overrideUrl?: string): Promise<void>;
export const KommentlyEmbed: DefineComponent<KommentlyEmbedProps>;
