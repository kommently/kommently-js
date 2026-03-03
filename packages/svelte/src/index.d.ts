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

export interface KommentlyEmbedActionOptions {
  siteId: string;
  slug?: string;
  backgroundEnabled?: boolean;
}

export interface KommentlyEmbedAction {
  update(options: KommentlyEmbedActionOptions): void;
  destroy(): void;
}

export function loadKommentlyWidgetScript(overrideUrl?: string): Promise<void>;
export function kommentlyEmbed(node: HTMLElement, options: KommentlyEmbedActionOptions): KommentlyEmbedAction;
