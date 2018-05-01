import fs from 'fs';
import EventEmitter from 'events';

const isEqualArray = (arr1, arr2) => {
	if (arr1.length === arr2.length) {
		return arr1.every((val, ind) => val === arr2[ind]);
	}
	return false;
}

export default class DirWatcher extends EventEmitter {
	constructor() {
		super();
		this.timer = null;
		this.content = null;
	}

	watch(path, delay) {
		this.timer = setInterval(() => {
			fs.readdir(path, (error, files) => {

				if (error) {
					console.log('An error has occured reading the specified path: ', error);
					return false;
				}

				if (!this.content) {
					this.content = files;
					return;
				}

				if (isEqualArray(files, this.content)) {
					this.content = files;
					super.emit('change', files);
				}
			});
		}, delay);
	}
}