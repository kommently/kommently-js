# @kommently-js/solid

Solid embed utilities for Kommently comments.

## Install

```bash
npm i @kommently-js/solid
```

## Usage

```tsx
import { kommentlyEmbed } from "@kommently-js/solid";

export function CommentsWidget() {
  return <div use:kommentlyEmbed={{ siteId: "SITE_ID", slug: "/my-post", backgroundEnabled: false }} />;
}
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
