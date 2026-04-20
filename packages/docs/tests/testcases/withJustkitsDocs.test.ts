import { withJustkitsDocs } from "@/nextjs";

const scannerRun = vi.fn();
vi.mock("@/scanner/manager", () => ({
  Scanner: class {
    run() {
      scannerRun();
    }
  },
}));
const watcherRun = vi.fn();
const watcherClose = vi.fn();
vi.mock("@/scanner/watch", () => ({
  Watcher: class {
    run() {
      watcherRun();
    }
    close() {
      watcherClose();
    }
  },
}));

describe("withJustkitsDocs", () => {
  const sampleNextConfig = {
    reactStrictMode: true,
  };

  beforeEach(() => {
    delete globalThis.__JUSTKITS_DOCS_STARTED__;
    delete globalThis.__JUSTKITS_DOCS_WATCHER__;
    delete globalThis.__JUSTKITS_DOCS_OUTPUT_DIR__;
  });

  afterEach(() => {
    process.argv = process.argv.filter(
      (arg) => arg !== "--watch" && arg !== "--dev",
    );
    vi.clearAllMocks();
  });

  it("should initialize Scanner in production mode and return the nextConfig", () => {
    const nextConfig = withJustkitsDocs(sampleNextConfig);

    expect(globalThis.__JUSTKITS_DOCS_STARTED__).toBe(true);
    expect(globalThis.__JUSTKITS_DOCS_OUTPUT_DIR__).toBe(".next/");
    expect(nextConfig).toBe(sampleNextConfig);
    expect(scannerRun).toHaveBeenCalled();
    expect(watcherRun).not.toHaveBeenCalled();
  });

  it("should initialize Watcher in watch mode and return the nextConfig", () => {
    process.argv.push("--watch");
    const nextConfig = withJustkitsDocs(sampleNextConfig);

    expect(globalThis.__JUSTKITS_DOCS_WATCHER__).toBeDefined();
    expect(globalThis.__JUSTKITS_DOCS_OUTPUT_DIR__).toBe(".next/");
    expect(nextConfig).toBe(sampleNextConfig);
    expect(watcherRun).toHaveBeenCalled();
    expect(scannerRun).not.toHaveBeenCalled();
  });

  describe("corner cases", () => {
    it("should not register exit handler again if already registered", () => {
      const processSpy = vi.spyOn(process, "on");
      process.argv.push("--watch");

      withJustkitsDocs(sampleNextConfig);
      const exitCallsAfterFirst = processSpy.mock.calls.filter(
        ([event]) => event === "exit",
      ).length;

      // Second call: exitHandlerRegistered is now true, should not register again
      withJustkitsDocs(sampleNextConfig);
      const exitCallsAfterSecond = processSpy.mock.calls.filter(
        ([event]) => event === "exit",
      ).length;

      expect(exitCallsAfterSecond).toBe(exitCallsAfterFirst);

      processSpy.mockRestore();
    });

    it("should not run Scanner if __JUSTKITS_DOCS_STARTED__ is already true", () => {
      globalThis.__JUSTKITS_DOCS_STARTED__ = true;

      withJustkitsDocs(sampleNextConfig);

      expect(scannerRun).not.toHaveBeenCalled();
    });

    it("should close the watcher when process exits", async () => {
      // vi.resetModules() gives a fresh module where exitHandlerRegistered=false,
      // guaranteeing process.on("exit", ...) is called so we can capture the handler.
      vi.resetModules();
      const { withJustkitsDocs: fresh } = await import("@/nextjs");

      let exitHandler: (() => void) | undefined;
      const processSpy = vi
        .spyOn(process, "on")
        .mockImplementation((event, handler) => {
          if (event === "exit") exitHandler = handler as () => void;
          return process;
        });

      process.argv.push("--watch");
      fresh(sampleNextConfig);
      exitHandler?.();

      expect(watcherClose).toHaveBeenCalled();

      processSpy.mockRestore();
    });
  });
});
