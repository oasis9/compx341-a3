const path = require('path');
const fs = require('fs');
const readline = require('readline');

const firstLine = async (pathToFile) => {
  const readable = fs.createReadStream(pathToFile);
  const reader = readline.createInterface({ input: readable });

  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close();
      resolve(line);
    });
  });

  readable.close();

  return line;
}

let failed = false;

const traverse = async (startPath, filter) => {
    if (!fs.existsSync(startPath)) {
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            await traverse(filename, filter);
        } else if (filename.indexOf(filter) >= 0) {
            if (!(await firstLine(filename)).startsWith('//')) {
                failed = true;
                console.log(filename);
            }
        }
    }
}

const timeout = setTimeout(() => {}, 9999999);

const test = async () => {
    await traverse('src', '.ts');

    process.exit(failed? 1 : 0);
}

test();

