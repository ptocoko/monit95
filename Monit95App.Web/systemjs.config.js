(function () {
    //System.appVersion = '3';
    var appVersion = '5';
    System.config({
        paths: {
            // псевдоним для пути к модулям
            'npm:': 'node_modules/'
        },
        // указываем загрузчику System, где искать модули
        map: {
            // наше приложение будет находиться в папке app
            app: 'app',

            // angular packages
            '@angular/core': `npm:@angular/core/bundles/core.umd.js?v=${appVersion}`,
            '@angular/common': `npm:@angular/common/bundles/common.umd.js?v=${appVersion}`,
            '@angular/common/http': `npm:@angular/common/bundles/common-http.umd.js?v=${appVersion}`,
            '@angular/compiler': `npm:@angular/compiler/bundles/compiler.umd.js?v=${appVersion}`,
            '@angular/animations': `npm:@angular/animations/bundles/animations.umd.js?v=${appVersion}`,
            '@angular/platform-browser': `npm:@angular/platform-browser/bundles/platform-browser.umd.js?v=${appVersion}`,
            '@angular/animations/browser': `npm:@angular/animations/bundles/animations-browser.umd.js?v=${appVersion}`,
            '@angular/platform-browser/animations': `npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js?v=${appVersion}`,
            '@angular/platform-browser-dynamic': `npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js?v=${appVersion}`,
            '@angular/http': `npm:@angular/http/bundles/http.umd.js?v=${appVersion}`,
            '@angular/router': `npm:@angular/router/bundles/router.umd.js?v=${appVersion}`,
            '@angular/forms': `npm:@angular/forms/bundles/forms.umd.js?v=${appVersion}`,
            '@angular/upgrade': `npm:@angular/upgrade/bundles/upgrade.umd.js?v=${appVersion}`,
            '@angular/material': `npm:@angular/material/bundles/material.umd.js?v=${appVersion}`,

            // cdk individual packages            
            '@angular/cdk': `npm:@angular/cdk/bundles/cdk.umd.js?v=${appVersion}`,
            '@angular/cdk/a11y': `npm:@angular/cdk/bundles/cdk-a11y.umd.js?v=${appVersion}`,
            '@angular/cdk/bidi': `npm:@angular/cdk/bundles/cdk-bidi.umd.js?v=${appVersion}`,
            '@angular/cdk/coercion': `npm:@angular/cdk/bundles/cdk-coercion.umd.js?v=${appVersion}`,
            '@angular/cdk/collections': `npm:@angular/cdk/bundles/cdk-collections.umd.js?v=${appVersion}`,
            '@angular/cdk/keycodes': `npm:@angular/cdk/bundles/cdk-keycodes.umd.js?v=${appVersion}`,
            '@angular/cdk/observers': `npm:@angular/cdk/bundles/cdk-observers.umd.js?v=${appVersion}`,
            '@angular/cdk/overlay': `npm:@angular/cdk/bundles/cdk-overlay.umd.js?v=${appVersion}`,
            '@angular/cdk/platform': `npm:@angular/cdk/bundles/cdk-platform.umd.js?v=${appVersion}`,
            '@angular/cdk/portal': `npm:@angular/cdk/bundles/cdk-portal.umd.js?v=${appVersion}`,
            '@angular/cdk/rxjs': `npm:@angular/cdk/bundles/cdk-rxjs.umd.js?v=${appVersion}`,
            '@angular/cdk/scrolling': `npm:@angular/cdk/bundles/cdk-scrolling.umd.js?v=${appVersion}`,
            '@angular/cdk/table': `npm:@angular/cdk/bundles/cdk-table.umd.js?v=${appVersion}`,
            '@angular/cdk/stepper': `npm:@angular/cdk/bundles/cdk-stepper.umd.js?v=${appVersion}`,

            '@ng-bootstrap/ng-bootstrap': `npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js?v=${appVersion}`,
            'angular-in-memory-web-api': `npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js?v=${appVersion}`,
            'tslib': `npm:tslib/tslib.js?v=${appVersion}`,
            'ngx-order-pipe': `npm:ngx-order-pipe/dist/bundles/ngx-order-pipe.umd.js?v=${appVersion}`,

            // пакеты angular2-modal     
            'angular2-modal': `npm:angular2-modal/bundle/angular2-modal.rollup.umd.js?v=${appVersion}`,
            'angular2-modal/plugins/bootstrap': `npm:angular2-modal/plugins/bootstrap/bundle/angular2-modal-bootstrap.rollup.umd.js?v=${appVersion}`,               
			
            // datepicker
            'mydatepicker': `npm:mydatepicker/bundles/mydatepicker.umd.min.js?v=${appVersion}`,
            
            'rxjs': 'npm:rxjs',           
        },
        // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
        packages: {
            app: {
                main: './main',
                defaultExtension: `js?v=${appVersion}`
            },
           
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})();