import { ChunkExtractor } from "@loadable/server";
import { HelmetData } from "react-helmet";
import serialize from "serialize-javascript";
import { IAppState } from "Store/IAppState";

export const template = (
  reactDom: string,
  reduxState: IAppState,
  helmetData: HelmetData,
  extractor: ChunkExtractor,
  styles: string,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" href="/manifest.json">
  <link rel="shortcut icon" href="/favicon.ico">
  <title>React SSR</title>
  ${styles}
  ${helmetData.title.toString()}
  ${helmetData.meta.toString()}
  ${extractor.getLinkTags()}
  ${extractor.getStyleTags()}
</head>

<body>
<div id="root">${reactDom}</div>
<script>
  window.REDUX_DATA = ${serialize(reduxState, { isJSON: true })}
</script>
${extractor.getScriptTags()}
</body>
</html>
    `;
