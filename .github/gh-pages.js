// ! This script is only used for Github Actions
// ! DO NOT RUN IT LOCALLY

/* Config */
const config = {
    includeFile: ["index.html"],
    includeDir: ["dist"],
};
/* Program Start */
const { opendir, rm } = require("fs/promises");
(async function (config) {
    const files = [];
    const dirs = [];
    try {
        const dir = await opendir("./");
        for await (const dirent of dir)
            if (dirent.isDirectory()) dirs.push(dirent.name);
            else files.push(dirent.name);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    dirs.filter((f) => !config.includeDir.find((d) => d === f)).forEach((f) => rm(f, { recursive: true }));
    files.filter((f) => !config.includeFile.find((d) => d === f)).forEach((f) => rm(f));
})(config);
