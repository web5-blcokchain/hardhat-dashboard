const hre = require("hardhat");

async function main() {
  console.log("启动 Hardhat 节点...");
  try {
    await hre.run("node");
  } catch (error) {
    console.error("Hardhat 节点启动失败:", error);
    process.exit(1);
  }
}

main();