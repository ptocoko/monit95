﻿(function (global) {
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
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
			
            // пакеты angular2-modal     
            'angular2-modal': 'npm:angular2-modal/bundle/angular2-modal.rollup.umd.js',
            'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/plugins/bootstrap/bundle/angular2-modal-bootstrap.rollup.umd.js',            
			
            //datepicker
			'mydatepicker': 'npm:mydatepicker/bundles/mydatepicker.umd.min.js',

            // остальные пакеты
            'rxjs': 'npm:rxjs',
			'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        // пакеты, которые указывают загрузчику System, как загружать файлы без имени и расширения
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);