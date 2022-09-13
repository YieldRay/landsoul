// ! This script is only used for Github Actions
// ! DO NOT RUN IT LOCALLY

const { opendir, rm, rmdir } = require("fs/promises");

async function ls(path = "./") {
    const files = [],
        folders = [];
    try {
        const dir = await opendir(path);
        for await (const dirent of dir) {
            if (dirent.isDirectory()) folders.push(dirent.name);
            else files.push(dirent.name);
        }
    } catch (err) {
        console.error(err);
    }
    return { folders, files };
}

ls().then(({ folders, files }) => {
    folders.filter((f) => f !== "dist").forEach((f) => rmdir(f, { recursive: true }));
    files.filter((f) => f !== "index.html").forEach((f) => rm(f));
});
