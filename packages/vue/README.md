# @kommently-js/vue

Vue embed for Kommently comments.

## Install

```bash
npm i @kommently-js/vue
```

## Usage

```vue
<script setup lang="ts">
import { KommentlyEmbed } from "@kommently-js/vue";
</script>

<template>
  <KommentlyEmbed site-id="SITE_ID" slug="/my-post" :background-enabled="false" />
</template>
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
