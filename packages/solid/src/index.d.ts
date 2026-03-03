import type { Accessor } from "solid-js";

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

export type MaybeAccessor<T> = T | (() => T);

export interface KommentlyEmbedDirectiveOptions {
  siteId: MaybeAccessor<string>;
  slug?: MaybeAccessor<string>;
  backgroundEnabled?: MaybeAccessor<boolean>;
}

export function loadKommentlyWidgetScript(overrideUrl?: string): Promise<void>;
export function kommentlyEmbed(
  element: HTMLElement,
  options: KommentlyEmbedDirectiveOptions | Accessor<KommentlyEmbedDirectiveOptions>
): void;
