(function () {
	System.appVersion = '3';
    System.config({
        paths: {
            // псевдоним для пути к модулям
            'npm:': 'node_modules/'
        },
        // указываем загрузчику System, где искать модули
        map: {
            // наше приложение будет находиться в папке app
            app: 'app',

            // пакеты angular
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
			'@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
			'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
			'@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
			'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
			'@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/material': 'npm:@angular/material/bundles/material.umd.js',

            // CDK individual packages            
            '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
            '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
            '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
            '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
            '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
            '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
            '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
            '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
            '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
            '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
            '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
            '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
			'@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
			'@angular/cdk/stepper': 'npm:@angular/cdk/bundles/cdk-stepper.umd.js',

            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',

            // пакеты angular2-modal     
            'angular2-modal': 'npm:angular2-modal/bundle/angular2-modal.rollup.umd.js',
            'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/plugins/bootstrap/bundle/angular2-modal-bootstrap.rollup.umd.js',   

            'ngx-order-pipe': 'npm:ngx-order-pipe/dist/bundles/ngx-order-pipe.umd.js',
			
            // datepicker
			'mydatepicker': 'npm:mydatepicker/bundles/mydatepicker.umd.min.js',
            
            'rxjs': 'npm:rxjs',
			'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
			'tslib': 'npm:tslib/tslib.js'
        },
        // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
        packages: {
            app: {
                main: './main',
                defaultExtension: `js?v=${System.appVersion}`
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})();