import { KommentlyEmbed as ReactKommentlyEmbed, loadKommentlyWidgetScript as loadReactWidgetScript } from "@kommently-js/react";
import { KommentlyEmbed as VueKommentlyEmbed, loadKommentlyWidgetScript as loadVueWidgetScript } from "@kommently-js/vue";
import { kommentlyEmbed as svelteKommentlyEmbed, loadKommentlyWidgetScript as loadSvelteWidgetScript } from "@kommently-js/svelte";
import { kommentlyEmbed as solidKommentlyEmbed, loadKommentlyWidgetScript as loadSolidWidgetScript } from "@kommently-js/solid";

window.__KOMMENTLY_DEV__ = {
  apiBaseUrl: "http://localhost:3000",
  widgetScriptUrl: "http://localhost:5173/widget.js"
};

void ReactKommentlyEmbed;
void VueKommentlyEmbed;
void svelteKommentlyEmbed;
void solidKommentlyEmbed;

void loadReactWidgetScript();
void loadVueWidgetScript();
void loadSvelteWidgetScript();
void loadSolidWidgetScript();
