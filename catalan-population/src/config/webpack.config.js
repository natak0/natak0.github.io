import path from "path";
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  resolve: {
    extensions: ["js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@components/layout": path.resolve(__dirname, "src/components/layout"),
    },
  },
};
