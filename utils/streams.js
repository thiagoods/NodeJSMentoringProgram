#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import fs from 'fs';
import util from 'util';
import stream from 'stream';
import https from 'https';
import csvjson from 'csvjson';
import through2 from 'through2';
import config from '../config';

const readdir = util.promisify(fs.readdir);
const isCSV = file => /\.csv$/.test(file);
const isCSS = file => /\.css$/.test(file);

function reverse() {
  const transformer = through2(function(data, encode, callback) {
    this.push(
      data.toString()
      .split('')
      .reverse()
      .join('') + '\n'
    );
    callback();
  });
  console.log('Write down the strings to be reversed and press ENTER. To exit press CTRL+C');
  process.stdin.pipe(transformer).pipe(process.stdout);
}

function transform() {
  const transformer = through2(function(data, encode, callback) {
    this.push(data.toString().toUpperCase());
    callback();
  });
  console.log('Write down the strings to be transformed and press ENTER. To exit press CTRL+C');
  process.stdin.pipe(transformer).pipe(process.stdout);
}

function OutputFile(filePath) {
  fs.createReadStream(filePath)
    .on('error', error => console.log(`An error occured while reading the file: ${error}`))
    .pipe(process.stdout);
}

function transformFile(filePath, mode) {
  if(!isCSV(filePath)) {
    throw new Error('Specified file should be a CSV');
  }
  const readStream = fs.createReadStream(filePath);
  const toObject = csvjson.stream.toObject();
  const stringify = csvjson.stream.stringify(' ');

  const chosenOutput = ( mode === 'stdout' ) ?
    process.stdout :
    fs.createWriteStream(filePath.replace(/csv$/, 'json'));

  readStream
    .on('error', error => console.log(`An error occured while reading the file: ${error}`))
    .pipe(toObject)
    .pipe(stringify)
    .pipe(chosenOutput);
}

const promisifiedPipe = (readStream, writeStream) =>
  new Promise((resolve, reject) => {
    readStream.pipe(writeStream, { end: false });
    readStream
      .on('end', () => resolve())
      .on('error', error => reject(error));
  });

async function bundleCSS(pathFolder) {
  const assets = await readdir(pathFolder);
  const externalCSS = https.get(config.externalCSS);
  const bundle = fs.createWriteStream(path.join(pathFolder, 'bundle.css'));
  bundle.on('error', error => console.log('An error occured while writing file'));
  const assetsArray = assets.filter(isCSS).map(fName => fs.createReadStream(path.join(pathFolder, fName)));
  const composedStreamsArray = [...assetsArray, externalCSS];
  for (let streamArray of composedStreamsArray) {
    await promisifiedPipe(streamArray, bundle);
  }
}

program
  .version('1.0.0')
  .option('-a, --action <required>','Action to be executed')
  .option('-f, --file [optional]','File to be processed')
  .option('-p, --path [optional]','Path with css files')
  .parse(process.argv);

const checkForArgument = (value, name) => {
  if (!value) {
    console.log(`Provide ${name} with --${name} option`);
    return false;
  }
  return true;
}

switch (program.action) {
  case 'reverse':
    reverse();
    break;
  case 'transform':
    transform();
    break;
  case 'outputFile':
    if (!checkForArgument(program.file, 'file')) break;
    OutputFile(program.file);
    break;
  case 'convertFromFile':
    if (!checkForArgument(program.file, 'file')) break;
    transformFile(program.file, 'stdout');
    break;
  case 'convertToFile':
    if (!checkForArgument(program.file, 'file')) break;
    transformFile(program.file, 'toFile');
    break;
  case 'cssBundler':
    if (!checkForArgument(program.path, 'path')) break;
    console.log('cssBundler');
		break;
  default:
    console.warn('\nIncorrect action passed. See available actions below');
    program.outputHelp();
}