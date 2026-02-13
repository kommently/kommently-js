import type { CSSProperties, ReactNode } from "react";

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
  className?: string;
  style?: CSSProperties;
}

export function loadKommentlyWidgetScript(overrideUrl?: string): Promise<void>;
export function KommentlyEmbed(props: KommentlyEmbedProps): ReactNode;
