/* eslint-disable no-console */
import "zone.js/node";

import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine } from "@angular/ssr/node";
import express from "express";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import bootstrap from "./main.server";
import { APP_VERSION, REQUEST, RESPONSE } from "./tokens";
import {provideLocation, provideUserAgent} from '@ng-web-apis/universal';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(__dirname, "../browser");
  const indexHtml = join(distFolder, "index.html");
  const packageJSON = join(distFolder, "package.json");
  const { version } = JSON.parse(readFileSync(packageJSON, "utf8"));
  console.log(JSON.stringify({ msg: `Start app version ${version}` }));

  const commonEngine = new CommonEngine();

  server.set("view engine", "html");
  server.set("views", distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    "*.*",
    express.static(distFolder, {
      maxAge: "1y",
    })
  );

  // All regular routes use the Angular engine
  server.get("*", (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: distFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: APP_VERSION, useValue: version },
          { provide: REQUEST, useValue: req },
          { provide: RESPONSE, useValue: res },
          provideLocation(req),
          provideUserAgent(req)
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env["PORT"] || 4200;

  // Start up the Node server
  const server = app();
  server.listen(+port, "0.0.0.0", () => {
    console.log(JSON.stringify({ msg: `Ssr server listening on ${port}` }));
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
  try {
    run();
  } catch (err) {
    console.error(
      JSON.stringify({
        msg: `Error running ssr server: ${(err as Error).message}`,
        err: (err as Error).stack,
      })
    );
  }
}

export default bootstrap;
