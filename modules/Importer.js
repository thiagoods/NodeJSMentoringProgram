import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import config from '../config';
import csvTools from 'csv-tools';

const readFile = promisify(fs.readFile);

const isCSV = file => /\.csv$/.test(file);

const getFileName = file => path.parse(file).name

const cleanCache = (filesArray, cache) => filesArray.reduce(
	(acc, file) => {
		const fileName = getFileName(file);
		return cache[fileName] ? {...acc, [fileName]: cache[fileName]} : acc
	}, {}
);

export default class Importer {
	constructor(watcher) {
		this.watcher = watcher;
		this.watcher.on('change', this.handleChange);
		this.cache = {};
	}

	handleChange = async (files = []) => {
		const csvFilesToParse = files.filter((file) => {
			const fileName = getFileName(file);
			if (this.cache[fileName] || !isCSV) {
				return false;
			}
			return true;
		});
		this.cache = cleanCache(files, this.cache);
		console.log(`Files already in cache: \n${JSON.stringify(this.cache)} \n==============================`);
		if (csvFilesToParse.length) {
			try {
				await Promise.all(csvFilesToParse.map(this.importFile))
								.then(data => {
										console.log(`New parsed files: \n${JSON.stringify(data)} \n==============================`);
								});

				// Using Sync method to import file data
				// const data = csvFilesToParse.map(this.importFileSync);
				// console.log(`New parsed files: \n${JSON.stringify(data)} \n==============================`);
			} catch (error) {
				console.log('Sorry, but an error has occured: ', error);
			}
		} else {
			console.log(`No new files available`);
		}
  };

	importFile = (file) => {
		const fileName = getFileName(file);
		try {
			const filePath = `${config.csvFolder}/${file}`;
			return readFile(filePath, 'utf-8')
							.then(buffer => csvTools.toJSON(buffer))
							.then(content => this.cache[fileName] = content)
							.catch(error => console.log(`An error has occured while reading file ${file}: `, error))
		} catch (error) {
			console.log(`An error has occured while reading file ${file}: `, error);
		}
  };

  importFileSync = (file) => {
    const fileName = getFileName(file);
    try {
			const filePath = `${config.csvFolder}/${file}`;
      const data = fs.readFileSync(filePath, 'utf-8');
      return csvTools.toJSON(data);
    } catch (error) {
      console.log(`An error has occured while reading file ${file}: `, error);
    }
  };
}