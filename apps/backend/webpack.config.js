/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/naming-convention
const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { join } = require("path");
const fs = require("fs");
const path = require("path");

class NxAppWebpackPluginCustomized extends NxAppWebpackPlugin {
  apply(compiler) {
    super.apply(compiler);
    // Hook vào sự kiện 'emit' của Webpack.
    // 'emit' xảy ra trước khi Webpack ghi các assets đã biên dịch ra đĩa.
    compiler.hooks.emit.tapAsync(
      "UpdateGeneratedPackageJsonVersionPlugin",
      (compilation, callback) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { RawSource } = compiler.webpack.sources; // Đối với Webpack 5

        // 1. Xác định đường dẫn của package.json gốc
        // compiler.context là thư mục gốc của ứng dụng (ví dụ: apps/backend)
        // '../../package.json' sẽ đưa chúng ta đến thư mục gốc của monorepo
        const rootPackageJsonPath = path.resolve(
          __dirname,
          "../../package.json"
        );
        let rootPackageJsonVersion;

        try {
          const rootPackageJson = JSON.parse(
            fs.readFileSync(rootPackageJsonPath, "utf-8")
          );
          rootPackageJsonVersion = rootPackageJson.version || "unknown";
        } catch (error) {
          console.warn(
            `[UpdateGeneratedPackageJsonVersionPlugin] Could not read root package.json version: ${error.message}. Using 'unknown'.`
          );
          rootPackageJsonVersion = "unknown";
        }

        // 2. Tìm package.json đã được Nx tạo ra trong các assets của compilation
        const packageName = "package.json"; // Tên của file package.json được tạo
        if (compilation.assets[packageName]) {
          try {
            const generatedPackageJsonContent = compilation.assets[packageName]
              .source()
              .toString("utf-8");
            const generatedPackageJson = JSON.parse(
              generatedPackageJsonContent
            );

            // 3. Cập nhật trường 'version'
            generatedPackageJson.version = rootPackageJsonVersion;

            // 4. Ghi lại nội dung đã sửa đổi vào assets
            const updatedPackageJsonContent = JSON.stringify(
              generatedPackageJson,
              null,
              2
            );
            compilation.assets[packageName] = new RawSource(
              updatedPackageJsonContent
            );

            console.log(
              `[UpdateGeneratedPackageJsonVersionPlugin] Updated generated ${packageName} with version: ${rootPackageJsonVersion}`
            );
            callback();
          } catch (error) {
            console.error(
              `[UpdateGeneratedPackageJsonVersionPlugin] Error processing generated ${packageName}:`,
              error
            );
            callback(error);
          }
        } else {
          console.warn(
            `[UpdateGeneratedPackageJsonVersionPlugin] Generated ${packageName} not found in assets. Skipping version update.`
          );
          callback();
        }
      }
    );
  }
}

module.exports = {
  output: {
    path: join(__dirname, "../../dist/apps/backend"),
  },
  plugins: [
    new NxAppWebpackPluginCustomized({
      target: "node",
      compiler: "tsc",
      main: "./src/main.ts",
      tsConfig: "./tsconfig.app.json",
      assets: ["./src/assets"],
      optimization: false,
      outputHashing: "none",
      generatePackageJson: true,
    }),
  ],
};
