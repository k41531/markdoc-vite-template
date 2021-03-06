const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const fs = require("fs");

const Markdoc = require("@markdoc/markdoc");
const callout = require("./schema/Callout.markdoc");
const heading = require("./schema/heading.markdoc");
const { createContentManifest } = require("./createContentManifest");

const CONTENT_DIR = path.join(__dirname, "content");
const TEMPLATE = fs.readFileSync("./public/template.html", "utf-8");

// The content manifest maps routes to Markdoc documents.
const contentManifest = createContentManifest(CONTENT_DIR);
// Loads the built JS
app.use(express.static("dist"));

app.get("*", (req, res) => {
  const path = req.params[0];
  const document = contentManifest[path];

  if (!document) {
    return res.sendStatus(404);
  }

  const { ast } = document;
  const config = {
    tags: {
      callout,
    },
    nodes: {
      heading,
    },
  };

  const content = Markdoc.transform(ast, config);
  const rendered = Markdoc.renderers.html(content) || "";
  const html = TEMPLATE.replace(/{{ CONTENT }}/, rendered);
  return res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
