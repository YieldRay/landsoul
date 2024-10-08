module.exports = {
    plugins: [
        require("autoprefixer"),
        require("postcss-preset-env")({ browsers: "> 0.5%, last 2 versions, Firefox ESR, not dead" }),
        require("cssnano")({
            preset: "default",
        }),
    ],
};
