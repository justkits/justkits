import { loadConfig } from "./config-loader";
import { FamilySvgBuilder } from "@converter/family";
import { StandaloneSvgBuilder } from "@converter/standalone";
import { defaultOptions, nativeOptions } from "@converter/options";
import { logger } from "@lib/logger";

export async function generateAction(options: {
  config?: string;
  dryRun?: boolean;
}) {
  try {
    const config = await loadConfig(options.config);

    const basePreset =
      config.platform === "native" ? nativeOptions : defaultOptions;
    const svgrOptions = {
      ...basePreset,
      ...config.options,
    };

    const baseDir = config.baseDir || process.cwd();
    const suffix = config.suffix || "";
    const generateIndex = config.index ?? false;
    const assetsDir = config.assetsDir || "assets";
    const srcDir = config.srcDir || "src";
    const dryRun = options.dryRun ?? false;

    let builder;
    if (config.type === "family") {
      builder = new FamilySvgBuilder(
        svgrOptions,
        baseDir,
        suffix,
        generateIndex,
        assetsDir,
        srcDir,
        dryRun,
      );
    } else {
      builder = new StandaloneSvgBuilder(
        svgrOptions,
        baseDir,
        suffix,
        generateIndex,
        assetsDir,
        srcDir,
        dryRun,
      );
    }

    logger.info(
      `🚀 Starting generation (type: ${config.type || "standalone"})...`,
    );
    await builder.generate();
  } catch (error) {
    logger.error("❌ Generation failed:");
    logger.error(String(error));
    process.exit(1);
  }
}
