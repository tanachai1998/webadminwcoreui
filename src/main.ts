import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  preserveWhitespaces: true
})
  .catch(err => console.log(err));

  export function getBaseUrl() {
    // return "https://sso.ipthailand.go.th/"
    // let baseurl = document.getElementsByTagName('base')[0].href;
    let baseurl = 'http://localhost/';
    console.log(baseurl)
    return baseurl.replace('http:', 'http:');

  }
  // return document.getElementsByTagName('base')[0].href;

  const providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl}
  ];
