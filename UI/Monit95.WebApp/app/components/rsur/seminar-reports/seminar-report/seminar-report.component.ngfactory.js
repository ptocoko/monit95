/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./seminar-report.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "@angular/common";
import * as i3 from "./seminar-report.component";
import * as i4 from "@angular/router";
import * as i5 from "../../../../services/seminar-report.service";
var styles_SeminarReportComponent = [i0.styles];
var RenderType_SeminarReportComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_SeminarReportComponent, data: {} });
export { RenderType_SeminarReportComponent as RenderType_SeminarReportComponent };
function View_SeminarReportComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 0, "img", [["class", "center-block"], ["height", "100"], ["src", "/progress.gif"], ["style", "margin-top:20px"]], null, null, null, null, null))], null, null); }
function View_SeminarReportComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "img", [["class", "img-thumbnail"], ["height", "100"]], [[8, "src", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showViewer(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i1.ɵdid(1, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i1.ɵpod(2, { "protocol-thumb": 0, "seminar-img-thumb": 1 })], function (_ck, _v) { var currVal_1 = "img-thumbnail"; var currVal_2 = _ck(_v, 2, 0, (_v.context.$implicit.Key === "protocol"), (_v.context.$implicit.Key !== "protocol")); _ck(_v, 1, 0, currVal_1, currVal_2); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.getPreviewer(_v.context.$implicit); _ck(_v, 0, 0, currVal_0); }); }
function View_SeminarReportComponent_5(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "span", [["class", "img-caption"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" \u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B "]))], null, null); }
function View_SeminarReportComponent_6(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "span", [["class", "viewer-prev-area viewer-action"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showPrevImg() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 0, "i", [["aria-hidden", "true"], ["class", "fa fa-angle-left fa-4x"]], null, null, null, null, null))], null, null); }
function View_SeminarReportComponent_7(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "span", [["class", "viewer-next-area viewer-action"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.showNextImg() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 0, "i", [["aria-hidden", "true"], ["class", "fa fa-angle-right fa-4x"]], null, null, null, null, null))], null, null); }
function View_SeminarReportComponent_4(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 9, "div", [["class", "image-viewer"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 0, "img", [["class", "viewing-img"]], [[8, "src", 4]], null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SeminarReportComponent_5)), i1.ɵdid(3, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SeminarReportComponent_6)), i1.ɵdid(5, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SeminarReportComponent_7)), i1.ɵdid(7, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵeld(8, 0, null, null, 1, "span", [["class", "viewer-close-area viewer-action"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.hideViewer() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵeld(9, 0, null, null, 0, "i", [["aria-hidden", "true"], ["class", "fa fa-times fa-2x"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_1 = (_co.viewingImage.Key === "protocol"); _ck(_v, 3, 0, currVal_1); var currVal_2 = _co.hasPrevImg(); _ck(_v, 5, 0, currVal_2); var currVal_3 = _co.hasNextImg(); _ck(_v, 7, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.viewingImage.FileUrl; _ck(_v, 1, 0, currVal_0); }); }
function View_SeminarReportComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 11, "div", [], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 5, "div", [["class", "report-info alert alert-info"]], null, null, null, null, null)), (_l()(), i1.ɵeld(2, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i1.ɵted(3, null, ["", ""])), (_l()(), i1.ɵeld(4, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), i1.ɵeld(5, 0, null, null, 1, "i", [], null, null, null, null, null)), (_l()(), i1.ɵted(6, null, ["", ""])), (_l()(), i1.ɵeld(7, 0, null, null, 2, "div", [["class", "photos"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SeminarReportComponent_3)), i1.ɵdid(9, 278528, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SeminarReportComponent_4)), i1.ɵdid(11, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.report.SeminarFiles; _ck(_v, 9, 0, currVal_2); var currVal_3 = _co.viewingImage; _ck(_v, 11, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.report.SeminarReportViewDto.SchoolName; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.report.SeminarReportViewDto.DateText; _ck(_v, 6, 0, currVal_1); }); }
export function View_SeminarReportComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\u0420\u0421\u0423\u0420: \u041E\u0442\u0447\u0435\u0442 \u043F\u043E \u0441\u0435\u043C\u0438\u043D\u0430\u0440\u0443"])), (_l()(), i1.ɵeld(2, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SeminarReportComponent_1)), i1.ɵdid(4, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SeminarReportComponent_2)), i1.ɵdid(6, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.isLoading; _ck(_v, 4, 0, currVal_0); var currVal_1 = !_co.isLoading; _ck(_v, 6, 0, currVal_1); }, null); }
export function View_SeminarReportComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "seminar-report", [], null, null, null, View_SeminarReportComponent_0, RenderType_SeminarReportComponent)), i1.ɵdid(1, 114688, null, 0, i3.SeminarReportComponent, [i4.ActivatedRoute, i5.SeminarReportService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var SeminarReportComponentNgFactory = i1.ɵccf("seminar-report", i3.SeminarReportComponent, View_SeminarReportComponent_Host_0, {}, {}, []);
export { SeminarReportComponentNgFactory as SeminarReportComponentNgFactory };
//# sourceMappingURL=seminar-report.component.ngfactory.js.map