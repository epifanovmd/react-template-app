import serialize from "serialize-javascript";
import {IAppState} from "../client/store/IAppState";
import {HelmetData} from "react-helmet";
import {ChunkExtractor} from "@loadable/server";

export const template = (reactDom: string, reduxState: IAppState, helmetData: HelmetData, extractor: ChunkExtractor) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" href="/client/manifest.json">
  <link rel="shortcut icon" href="/client/favicon.ico">
  <title>React SSR</title>
  ${helmetData.title.toString()}
  ${helmetData.meta.toString()}
  ${extractor.getLinkTags()}
  ${extractor.getStyleTags()}
  <link rel="stylesheet" type="text/css" href="./client/styles/client.css" />
</head>

<body>
<div id="root">${reactDom}</div>
<script>
  window.REDUX_DATA = ${serialize(reduxState, {isJSON: true})}
</script>
${extractor.getScriptTags()}
</body>
</html>
    `;
};
