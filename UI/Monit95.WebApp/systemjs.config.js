(function () {    
    const appVersionExtension = 'js?v=4';
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
            '@angular/core': `npm:@angular/core/bundles/core.umd.${appVersionExtension}`,
            '@angular/common': `npm:@angular/common/bundles/common.umd.${appVersionExtension}`,
            '@angular/common/http': `npm:@angular/common/bundles/common-http.umd.${appVersionExtension}`,
            '@angular/compiler': `npm:@angular/compiler/bundles/compiler.umd.${appVersionExtension}`,
            '@angular/animations': `npm:@angular/animations/bundles/animations.umd.${appVersionExtension}`,
            '@angular/platform-browser': `npm:@angular/platform-browser/bundles/platform-browser.umd.${appVersionExtension}`,
            '@angular/animations/browser': `npm:@angular/animations/bundles/animations-browser.umd.${appVersionExtension}`,
            '@angular/platform-browser/animations': `npm:@angular/platform-browser/bundles/platform-browser-animations.umd.${appVersionExtension}`,
            '@angular/platform-browser-dynamic': `npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.${appVersionExtension}`,
            '@angular/http': `npm:@angular/http/bundles/http.umd.${appVersionExtension}`,
            '@angular/router': `npm:@angular/router/bundles/router.umd.${appVersionExtension}`,
            '@angular/forms': `npm:@angular/forms/bundles/forms.umd.${appVersionExtension}`,
            '@angular/upgrade': `npm:@angular/upgrade/bundles/upgrade.umd.${appVersionExtension}`,
            '@angular/material': `npm:@angular/material/bundles/material.umd.js`,

            // cdk individual packages            
            '@angular/cdk': `npm:@angular/cdk/bundles/cdk.umd.${appVersionExtension}`,
            '@angular/cdk/a11y': `npm:@angular/cdk/bundles/cdk-a11y.umd.${appVersionExtension}`,
            '@angular/cdk/bidi': `npm:@angular/cdk/bundles/cdk-bidi.umd.${appVersionExtension}`,
            '@angular/cdk/coercion': `npm:@angular/cdk/bundles/cdk-coercion.umd.${appVersionExtension}`,
            '@angular/cdk/collections': `npm:@angular/cdk/bundles/cdk-collections.umd.${appVersionExtension}`,
            '@angular/cdk/keycodes': `npm:@angular/cdk/bundles/cdk-keycodes.umd.${appVersionExtension}`,
            '@angular/cdk/observers': `npm:@angular/cdk/bundles/cdk-observers.umd.${appVersionExtension}`,
            '@angular/cdk/overlay': `npm:@angular/cdk/bundles/cdk-overlay.umd.${appVersionExtension}`,
            '@angular/cdk/platform': `npm:@angular/cdk/bundles/cdk-platform.umd.${appVersionExtension}`,
            '@angular/cdk/portal': `npm:@angular/cdk/bundles/cdk-portal.umd.${appVersionExtension}`,
            '@angular/cdk/rxjs': `npm:@angular/cdk/bundles/cdk-rxjs.umd.${appVersionExtension}`,
            '@angular/cdk/scrolling': `npm:@angular/cdk/bundles/cdk-scrolling.umd.${appVersionExtension}`,
            '@angular/cdk/table': `npm:@angular/cdk/bundles/cdk-table.umd.${appVersionExtension}`,
            '@angular/cdk/stepper': `npm:@angular/cdk/bundles/cdk-stepper.umd.${appVersionExtension}`,
            '@angular/cdk/accordion': `npm:@angular/cdk/bundles/cdk-accordion.umd.${appVersionExtension}`,
            '@angular/cdk/layout': `npm:@angular/cdk/bundles/cdk-layout.umd.${appVersionExtension}`,

            '@ng-bootstrap/ng-bootstrap': `npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.${appVersionExtension}`,
            'angular-in-memory-web-api': `npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.${appVersionExtension}`,
            'tslib': `npm:tslib/tslib.${appVersionExtension}`,
            'ngx-order-pipe': `npm:ngx-order-pipe/dist/bundles/ngx-order-pipe.umd.${appVersionExtension}`,

            // пакеты angular2-modal     
            'angular2-modal': `npm:angular2-modal/bundle/angular2-modal.rollup.umd.${appVersionExtension}`,
            'angular2-modal/plugins/bootstrap': `npm:angular2-modal/plugins/bootstrap/bundle/angular2-modal-bootstrap.rollup.umd.${appVersionExtension}`,               
			
            // datepicker
            'mydatepicker': `npm:mydatepicker/bundles/mydatepicker.umd.min.${appVersionExtension}`,
            
            'rxjs': 'npm:rxjs',           
        },
        // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
        packages: {
            app: {
                main: './main',
                defaultExtension: appVersionExtension
            },
           
            rxjs: {
                defaultExtension: appVersionExtension
            }
        }
    });
})();