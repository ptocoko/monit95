import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';
import 'hammerjs';

//enableProdMode();

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);