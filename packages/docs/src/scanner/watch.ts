import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import chokidar, { type FSWatcher } from "chokidar";

import type { ResolvedConfig } from "./config";
import { Scanner } from "./manager";

export class Watcher extends Scanner {
  private timer: ReturnType<typeof setTimeout> | null = null;
  private watcher: FSWatcher | null = null;

  constructor(config: ResolvedConfig) {
    super(config);
  }

  public run() {
    super.run();

    this.watcher = chokidar
      .watch(this.contentsDir, {
        ignoreInitial: true,
        ignored: (filePath, stats) =>
          stats?.isFile() === true && !filePath.endsWith(".mdx"),
      })
      .on("add", (path) => this.rebuild(path))
      .on("change", (path) => this.rebuild(path))
      .on("unlink", (path) => this.rebuild(path));
  }

  public close() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.watcher?.close();
    this.watcher = null;
  }

  private rebuild(changedPath: string) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      const rel = relative(this.contentsDir, changedPath);
      const page = rel.split(/[\\/]/)[0];
      const pagePath = join(this.contentsDir, page);

      try {
        if (existsSync(pagePath)) {
          const route = `${this.baseUrl === "/" ? "" : this.baseUrl}/${page}`;
          this.manifest[page] = this.buildTree(pagePath, route);
        } else {
          delete this.manifest[page];
        }

        this.saveManifestFile();
        console.log(`[Justkits Docs] Manifest updated (${page})`);
      } catch (err) {
        console.error(`[Justkits Docs] Watch rebuild failed:`, err);
      }
    }, 100);
  }
}
