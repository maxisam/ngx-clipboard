import { platformBrowser } from '@angular/platform-browser';
import { MainModuleNgFactory } from './modules/main.module.ngfactory';

platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
