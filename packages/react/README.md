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

TypeScript declarations are included in the package.
