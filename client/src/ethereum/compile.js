const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
const catalystPath = path.resolve(__dirname, "contracts", "Catalyst.sol");
console.log("Compile : Read file");

const source = fs.readFileSync(catalystPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);
console.log("before loop");
for (let contract in output) {
  console.log(contract);
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
