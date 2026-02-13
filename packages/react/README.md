# @kommently-js/react

React embed for Kommently comments.

## Install

```bash
npm i @kommently-js/react
```

## Usage

```tsx
import { KommentlyEmbed } from "@kommently-js/react";

export function CommentsWidget() {
  return <KommentlyEmbed siteId="SITE_ID" slug="/my-post" />;
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
