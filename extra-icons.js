const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const { pipeline } = require("stream/promises");

const baseDir = "./extra"; // Point to your external icons source
const destinationDir = "copied_icons";
fs.mkdirSync(destinationDir, { recursive: true });
glob(`${baseDir}/**`, { nodir: true, dotRelative: false })
  .then(async (files) => {
    for (const file of files) {
      const destinationPath = path.join(
        destinationDir,
        file.replace("extra/", "")
      );
      const readStream = fs.createReadStream(file);
      const writeStream = fs.createWriteStream(destinationPath);
      await pipeline(readStream, writeStream);
    }
  })
  .catch((er) => {
    console.log("ERR", er);
  });
