/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  extends: [
    "../../typedoc.base.js", // Điều chỉnh đường dẫn này nếu file preset ở vị trí khác
  ],
  entryPoints: ["./src/index.ts"],
  out: "../../docs/api/utils",
  publicPath: "/api/utils",
  name: "@ecoma/utils",
  entryFileName: "utils",
};
