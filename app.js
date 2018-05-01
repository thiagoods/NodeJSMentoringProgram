import config from './config';
import { User, Product, DirWatcher } from './modules';

const user = new User();
const product = new Product();

const myWatcher = new DirWatcher();

myWatcher.watch('./', 1000);

console.log(config.name);
console.log('============================');