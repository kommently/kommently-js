# @kommently-js/svelte

Svelte embed utilities for Kommently comments.

## Install

```bash
npm i @kommently-js/svelte
```

## Usage

```svelte
<script lang="ts">
import { kommentlyEmbed } from "@kommently-js/svelte";
</script>

<div use:kommentlyEmbed={{ siteId: "SITE_ID", slug: "/my-post", backgroundEnabled: false }} />
```

## Optional local dev override

Set this before your app mounts:

```ts
window.__KOMMENTLY_DEV__ = {
  apiBaseUrl: "http://localhost:3000",
  widgetScriptUrl: "http://localhost:5173/widget.js"
};
```

TypeScript declarations are included in the package.
