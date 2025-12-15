import http from "node:http";
import fs from "node:fs";
import path from "node:path/posix";
import { pipeline } from "node:stream/promises";
import { spawn } from "node:child_process";
import { styleText } from "node:util";

$("sass --watch src:dist");

const server = createDevServer();
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Dev server running at
- ${styleText(['cyan'], `http://localhost:${PORT}`)}
`);
});

function createDevServer() {
    return http.createServer((req, res) => {
        if (!req.url) {
            res.writeHead(400);
            res.end("Bad Request");
            return;
        }

        if (req.url === "/sse") {
            res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            });
            const watcher = watchFiles(["./*.html", "./dist"], (eventType, filename) => {
                if (!filename) return;
                res.write(
                    `data: ${JSON.stringify({
                        eventType,
                        filename,
                    })}\n\n`
                );
            });

            req.on("error", () => {
                watcher.close();
            });

            req.on("close", () => {
                watcher.close();
            });

            return;
        }

        const rewriteSSE = (html: string) =>
            html.replace(
                "</head>",
                `\n${iifeScript(() => {
                    const es = new EventSource("/sse");
                    es.addEventListener("message", ({ data }) => {
                        console.log(JSON.parse(data));
                        window.location.reload();
                    });
                })}\n</head>`
            );

        if (req.url === "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
            return res.end(rewriteSSE(html));
        }

        const filepath = path.join(process.cwd(), new URL(req.url, `http://${req.headers.host}`).pathname.slice(1));

        if (!fs.existsSync(filepath)) {
            res.writeHead(404);
            return res.end("Not Found");
        }

        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            res.writeHead(200, { "Content-Type": "text/html" });
            return res.end(rewriteSSE(fs.readFileSync(path.join(filepath, "index.html"), "utf-8")));
        }

        const ext = path.extname(filepath).slice(1);
        const mimeType = mimeTypes[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": mimeType });
        if (ext === "html") {
            return res.end(rewriteSSE(fs.readFileSync(filepath, "utf-8")));
        }
        return pipeline(fs.createReadStream(filepath), res).catch(() => {
            res.end();
        });
    });
}

const mimeTypes: Record<string, string> = {
    html: "text/html",
    js: "application/javascript",
    css: "text/css",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    txt: "text/plain",
};

function iife<A extends unknown[]>(fn: (...args: A) => void, ...args: A) {
    if (args.length > 0) {
        const input = args.map((arg) => JSON.stringify(arg)).join(", ");
        return `(${fn.toString()})(${input});`;
    } else {
        return `(${fn.toString()})();`;
    }
}

function iifeScript<A extends unknown[]>(fn: (...args: A) => void, ...args: A) {
    return `<script>${iife(fn, ...args)}</script>`
}

function watchFiles(patterns: string[], listener: fs.WatchListener<string>) {
    const files = fs.globSync(patterns);
    const watchers = files.map((file) =>
        fs.watch(file, { recursive: true }, (event, filename) => {
            listener(event, filename);
        })
    );
    return {
        close: () => {
            watchers.forEach((watcher) => watcher.close());
        },
    };
}

function $(cmd: string) {
    spawn(cmd, {
        shell: true,
        stdio: "inherit",
        env: {
            ...process.env,
            FORCE_COLOR: "1",
            PATH: process.env.PATH + path.delimiter + path.join(process.cwd(), "node_modules/.bin"),
        },
    });
}
