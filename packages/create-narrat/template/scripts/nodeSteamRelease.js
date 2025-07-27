const fs = require("fs").promises;
const fsOld = require("fs");
const path = require("path");
console.log(
  `Copying game build from out to out-steam and adding the steam appid file...`,
);

async function pathExists(f) {
  try {
    await fs.stat(f);
    return true;
  } catch {
    return false;
  }
}

// Function to find the root directory by looking for package.json
function findRootDir(currentDir) {
  while (!fsOld.existsSync(path.join(currentDir, "package.json"))) {
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error("Could not find package.json in any parent directory");
    }
    currentDir = parentDir;
  }
  return currentDir;
}

// Get the folder name from command line arguments
const folderName = process.argv[2];
if (!folderName) {
  console.error("Please provide the folder name as a parameter.");
  process.exit(1);
}
const platformName = process.argv[3];
if (!platformName) {
  console.error("Please provide the platform name as a parameter.");
  process.exit(1);
}

const outFolderName = process.argv[4];
if (!outFolderName) {
  console.error("Please provide the out folder name as a parameter.");
  process.exit(1);
}

// IMPORTANT: on mac SteamAppId needs to be next to the actual executable inside the package...
const steamAppIdExtraPathName = process.argv[5];

const validPlatforms = ["linux64", "osx", "win64"];
if (validPlatforms.includes(platformName) === false) {
  console.error(
    `Platform name option is invalid: Should be one of: ${validPlatforms.join(", ")}`,
  );
}

// Find the root directory
const rootDir = findRootDir(__dirname);

// Define source and destination directories
const sourceDir = path.join(rootDir, "out", folderName);
const destDir = path.join(rootDir, outFolderName, folderName);
const steamAppIdFile = path.join(rootDir, "steam_appid.txt");
const destSteamAppIdFile = path.join(
  rootDir,
  outFolderName,
  folderName,
  steamAppIdExtraPathName ?? "",
  "steam_appid.txt",
);

// Function to move a folder
async function moveFolder(src, dest) {
  try {
    await fs.rename(src, dest);
  } catch (err) {
    console.error(`Error moving folder from ${src} to ${dest}`, err);
  }
}

// Function to copy a folder
async function copyFolder(src, dest) {
  try {
    await fs.cp(src, dest, { recursive: true });
  } catch (err) {
    console.error(`Error copying folder from ${src} to ${dest}`, err);
  }
}

// Function to copy a file
async function copyFile(src, dest) {
  try {
    await fs.copyFile(src, dest);
  } catch (err) {
    console.error(`Error copying file from ${src} to ${dest}`, err);
  }
}

const steamDestPath = path.join(rootDir, outFolderName, folderName);
async function moveSteamAPIFiles() {
  const steamSrcPath = path.join(
    rootDir,
    "node_modules",
    "steamworks.js",
    "dist",
    platformName,
  );
  await fs.cp(steamSrcPath, steamDestPath, { recursive: true });
}

async function main() {
  try {
    // Remove the out folder if already exists
    const exists = await pathExists(steamDestPath);
    if (exists) {
      console.log(`Deleting previous steam build...`);
      await fs.rm(steamDestPath, {
        recursive: true,
      });
    }
    // Create the out-steam folder
    console.log(`Creating out-steam folder...`);
    await fs.mkdir(steamDestPath, {
      recursive: true,
    });

    // Move the folder
    console.log(`Moving build to new folder...`);
    await copyFolder(sourceDir, destDir);

    // Copy steam_appid.txt
    console.log(`Copying steam_appid.txt...`);
    await copyFile(steamAppIdFile, destSteamAppIdFile);

    // Moving steam API files
    console.log(`Copying Steam API files for ${platformName}...`);
    await moveSteamAPIFiles();
    console.log(`Steam build ready at ${destDir}`);
  } catch (err) {
    console.error(`Unexpected error generating steam build`, err);
  }
}
main();
