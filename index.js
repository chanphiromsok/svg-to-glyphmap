const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const { pipeline } = require("stream/promises");

const baseDir = "../symbols/web";
const destinationDir = "copied_icons";
fs.mkdirSync(destinationDir, { recursive: true });
glob(`${baseDir}/*/`) // Match folders like "test2/1x_mobiledata/"
  .then(async (folders) => {
    for (const folder of folders) {
      // Extract folder name (e.g., "1x_mobiledata")
      const folderPath = folder.replace(/\/$/, ""); // Remove trailing slash
      const folderName = path.basename(folderPath);
      // Expected file path (e.g., "test2/1x_mobiledata/materialsymbolsrounded/1x_mobiledata_24px.svg")
      const expectedFilePath = path.join(
        folderPath,
        "materialsymbolsrounded",
        `${folderName}_wght300_20px.svg`
      );

      // Check if the file exists
      if (fs.existsSync(expectedFilePath)) {
        console.log(`Found matching file: ${expectedFilePath}`);
        // Destination path (e.g., "copied_icons/1x_mobiledata.svg")
        const destinationPath = path.join(destinationDir, `${folderName}.svg`);
        // Copy with streams
        const readStream = fs.createReadStream(expectedFilePath);
        const writeStream = fs.createWriteStream(destinationPath);
        try {
          await pipeline(readStream, writeStream);
          console.log(`Copied: ${folderName}.svg`);
        } catch (err) {
          console.error(`Error copying ${folderName}.svg:`, err);
        }
      } else {
        console.log(`No matching file in folder: ${folderName}`);
      }
    }
  })
  .catch((err) => {
    console.error("Error finding folders:", err);
  });
