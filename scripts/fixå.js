const { resolve } = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

const falseAA = "å";
const realAA = "å";

(async () => {
    for await (const f of getFiles('.')) {
        let split = f.split(".")
        if(split[split.length - 1] === "tex"){
            (async ()=>{
                await writeFile(f, (await readFile(f)).toString().split(falseAA).join(realAA))
            })()
        }
    }
})()