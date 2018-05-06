import config from './config';
import { User, Product, DirWatcher, Importer } from './modules';

const user = new User();
const product = new Product();
const myWatcher = new DirWatcher();
const importer = new Importer(myWatcher);

myWatcher.watch(config.csvFolder, 1000);

console.log(config.name);
console.log('============================');