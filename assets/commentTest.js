
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const firstLine = async (pathToFile) => {
  const readable = fs.createReadStream(pathToFile);
  const reader = readline.createInterface({ input: readable });

  const line = await new Promise((resolve) => {
    reader.on('line', line => {
      reader.close();
      resolve(line);
    });
  });

  readable.close();

  return line;
}

let failed = false

const traverse = async (basePath, filters) => {
  if (!fs.existsSync(basePath)) {
    return;
  }

  var files = fs.readdirSync(basePath);
  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(basePath, files[i]);
    var stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      await traverse(filePath, filters);
    } else {
      for (let filter of filters) {
        if (filePath.endsWith(filter)) {
          if (!(await firstLine(filePath)).startsWith('// ')) {
            failed = true;
            console.log(filePath);
          }
        }
      }
    }
  }
}

const timeout = setTimeout(() => {}, 9999999);

const test = async () => {
  await traverse('src', [ '.ts', '.tsx' ]);

  process.exit(failed? 1 : 0);
}

test();
