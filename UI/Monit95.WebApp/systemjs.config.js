(function () {    
    const appVersionExtension = 'js?v=341';
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
            '@angular/core': `npm:@angular/core/bundles/core.umd.min.${appVersionExtension}`,
			'@angular/common': `npm:@angular/common/bundles/common.umd.min.${appVersionExtension}`,
			'@angular/common/http': `npm:@angular/common/bundles/common-http.umd.min.${appVersionExtension}`,
			'@angular/compiler': `npm:@angular/compiler/bundles/compiler.umd.min.${appVersionExtension}`,
			'@angular/animations': `npm:@angular/animations/bundles/animations.umd.min.${appVersionExtension}`,
			'@angular/platform-browser': `npm:@angular/platform-browser/bundles/platform-browser.umd.min.${appVersionExtension}`,
			'@angular/animations/browser': `npm:@angular/animations/bundles/animations-browser.umd.min.${appVersionExtension}`,
			'@angular/platform-browser/animations': `npm:@angular/platform-browser/bundles/platform-browser-animations.umd.min.${appVersionExtension}`,
			'@angular/platform-browser-dynamic': `npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.${appVersionExtension}`,
			//'@angular/http': `npm:@angular/http/bundles/http.umd.min.${appVersionExtension}`,
			'@angular/router': `npm:@angular/router/bundles/router.umd.min.${appVersionExtension}`,
			'@angular/forms': `npm:@angular/forms/bundles/forms.umd.min.${appVersionExtension}`,
            //'@angular/upgrade': `npm:@angular/upgrade/bundles/upgrade.umd.${appVersionExtension}`,
			'@angular/material': `npm:@angular/material/bundles/material.umd.min.js`,

            // cdk individual packages            
			'@angular/cdk': `npm:@angular/cdk/bundles/cdk.umd.min.${appVersionExtension}`,
			'@angular/cdk/a11y': `npm:@angular/cdk/bundles/cdk-a11y.umd.min.${appVersionExtension}`,
			'@angular/cdk/bidi': `npm:@angular/cdk/bundles/cdk-bidi.umd.min.${appVersionExtension}`,
			'@angular/cdk/coercion': `npm:@angular/cdk/bundles/cdk-coercion.umd.min.${appVersionExtension}`,
			'@angular/cdk/collections': `npm:@angular/cdk/bundles/cdk-collections.umd.min.${appVersionExtension}`,
			'@angular/cdk/keycodes': `npm:@angular/cdk/bundles/cdk-keycodes.umd.min.${appVersionExtension}`,
			'@angular/cdk/observers': `npm:@angular/cdk/bundles/cdk-observers.umd.min.${appVersionExtension}`,
			'@angular/cdk/overlay': `npm:@angular/cdk/bundles/cdk-overlay.umd.min.${appVersionExtension}`,
			'@angular/cdk/platform': `npm:@angular/cdk/bundles/cdk-platform.umd.min.${appVersionExtension}`,
			'@angular/cdk/portal': `npm:@angular/cdk/bundles/cdk-portal.umd.min.${appVersionExtension}`,
			'@angular/cdk/rxjs': `npm:@angular/cdk/bundles/cdk-rxjs.umd.min.${appVersionExtension}`,
			'@angular/cdk/scrolling': `npm:@angular/cdk/bundles/cdk-scrolling.umd.min.${appVersionExtension}`,
			'@angular/cdk/table': `npm:@angular/cdk/bundles/cdk-table.umd.min.${appVersionExtension}`,
			'@angular/cdk/stepper': `npm:@angular/cdk/bundles/cdk-stepper.umd.min.${appVersionExtension}`,
			'@angular/cdk/accordion': `npm:@angular/cdk/bundles/cdk-accordion.umd.min.${appVersionExtension}`,
			'@angular/cdk/layout': `npm:@angular/cdk/bundles/cdk-layout.umd.min.${appVersionExtension}`,

			'@ng-bootstrap/ng-bootstrap': `npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.${appVersionExtension}`,
			'angular-in-memory-web-api': `npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.min.${appVersionExtension}`,
			'tslib': `npm:tslib/tslib.${appVersionExtension}`,
			'ngx-order-pipe': `npm:ngx-order-pipe/dist/bundles/ngx-order-pipe.umd.${appVersionExtension}`,

            // пакеты angular2-modal     
			'angular2-modal': `npm:angular2-modal/bundle/angular2-modal.rollup.umd.min.${appVersionExtension}`,
			'angular2-modal/plugins/bootstrap': `npm:angular2-modal/plugins/bootstrap/bundle/angular2-modal-bootstrap.rollup.umd.min.${appVersionExtension}`,               
			
            // datepicker
            'mydatepicker': `npm:mydatepicker/bundles/mydatepicker.umd.min.${appVersionExtension}`,

			'hammerjs': 'npm:hammerjs/hammer.min.js',
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