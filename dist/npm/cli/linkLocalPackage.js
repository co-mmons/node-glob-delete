#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChildProcess = require("child_process");
var FileSystem = require("fs");
var Path = require("path");
var args = process.argv.slice(2);
var nodeModulesPath = Path.join(process.cwd(), "node_modules");
var packageName = args.length > 0 ? args[0] : undefined;
var packageSrc = args.length > 1 ? Path.resolve(args[1]) : undefined;
var packageTmpPath = Path.join(nodeModulesPath, ".tmp-" + packageName);
var packagePath = Path.join(nodeModulesPath, packageName);
try {
    ChildProcess.execSync("hln -u " + packagePath);
}
catch (e) { }
try {
    FileSystem.unlinkSync(packageTmpPath);
}
catch (e) { }
ChildProcess.execSync("ln -s " + packageSrc + " " + packageTmpPath);
ChildProcess.execSync("hln " + packageTmpPath + " " + packagePath);