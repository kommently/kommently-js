# Kommently JS SDK

Official framework SDKs for embedding Kommently comments.

## Public packages

| Package | Usage |
| --- | --- |
| `@kommently-js/react` | `<KommentlyEmbed siteId="..." slug="..." />` |
| `@kommently-js/vue` (coming soon) | `<KommentlyEmbed site-id="..." slug="..." />` |
| `@kommently-js/svelte` (coming soon) | `<div use:kommentlyEmbed={{ siteId, slug }} />` |
| `@kommently-js/solid` (coming soon) | `<div use:kommentlyEmbed={{ siteId, slug }} />` |

## Install

Install only your framework package:

```bash
npm i @kommently-js/react
# or
npm i @kommently-js/vue
# or
npm i @kommently-js/svelte
# or
npm i @kommently-js/solid
```

## React quick start

```tsx
import { KommentlyEmbed } from "@kommently-js/react";

export function CommentsWidget() {
  return <KommentlyEmbed siteId="SITE_ID" slug="/my-post" />;
}
```

## Vue quick start

```vue
<script setup lang="ts">
import { KommentlyEmbed } from "@kommently-js/vue";
</script>

<template>
  <KommentlyEmbed site-id="SITE_ID" slug="/my-post" />
</template>
```

## Svelte quick start

```svelte
<script lang="ts">
import { kommentlyEmbed } from "@kommently-js/svelte";
</script>

<div use:kommentlyEmbed={{ siteId: "SITE_ID", slug: "/my-post" }} />
```

## Solid quick start

```tsx
import { kommentlyEmbed } from "@kommently-js/solid";

export function CommentsWidget() {
  return <div use:kommentlyEmbed={{ siteId: "SITE_ID", slug: "/my-post" }} />;
}
```

## Runtime dev override

Set before app mount when running locally:

```ts
window.__KOMMENTLY_DEV__ = {
  apiBaseUrl: "http://localhost:3000",
  widgetScriptUrl: "http://localhost:5173/widget.js"
};
```

Legacy key still supported:

```ts
window.__KOMMENTLY_WIDGET_SCRIPT_URL__ = "http://localhost:5173/widget.js";
```

## Notes

- Framework packages load `https://cdn.kommently.com/js/widget.js` automatically.
- SDK wrappers keep compatibility with the existing widget runtime by injecting the legacy script embed format (`data-site-id` / `data-slug`) under the hood.

## Local development

```bash
pnpm check
pnpm check:packages
```
