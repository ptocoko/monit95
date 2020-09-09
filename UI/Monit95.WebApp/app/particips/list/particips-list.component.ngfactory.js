/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./particips-list.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "../../../node_modules/@angular/material/progress-spinner/typings/index.ngfactory";
import * as i3 from "@angular/material/progress-spinner";
import * as i4 from "@angular/cdk/platform";
import * as i5 from "@angular/common";
import * as i6 from "@angular/platform-browser/animations";
import * as i7 from "../shared/list/list.component.ngfactory";
import * as i8 from "../shared/list/list.component";
import * as i9 from "@angular/router";
import * as i10 from "@angular/material/dialog";
import * as i11 from "@angular/material/snack-bar";
import * as i12 from "../../services/particip.service";
import * as i13 from "../../shared/school-collector.service";
import * as i14 from "./particips-list.component";
var styles_ParticipsListComponent = [i0.styles];
var RenderType_ParticipsListComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_ParticipsListComponent, data: {} });
export { RenderType_ParticipsListComponent as RenderType_ParticipsListComponent };
function View_ParticipsListComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "p", [["style", "position:absolute; top:50%; left:50%"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 1, "mat-spinner", [["class", "mat-spinner mat-progress-spinner"], ["mode", "indeterminate"], ["role", "progressbar"]], [[2, "_mat-animation-noopable", null], [4, "width", "px"], [4, "height", "px"]], null, null, i2.View_MatSpinner_0, i2.RenderType_MatSpinner)), i1.ɵdid(2, 49152, null, 0, i3.MatSpinner, [i1.ElementRef, i4.Platform, [2, i5.DOCUMENT], [2, i6.ANIMATION_MODULE_TYPE], i3.MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS], null, null)], null, function (_ck, _v) { var currVal_0 = i1.ɵnov(_v, 2)._noopAnimations; var currVal_1 = i1.ɵnov(_v, 2).diameter; var currVal_2 = i1.ɵnov(_v, 2).diameter; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }); }
function View_ParticipsListComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "table-list", [], null, null, null, i7.View_ListComponent_0, i7.RenderType_ListComponent)), i1.ɵdid(1, 4243456, null, 0, i8.ListComponent, [i9.Router, i10.MatDialog, i11.MatSnackBar, i12.ParticipService, i13.SchoolCollectorService], { particips: [0, "particips"], addParticipRouterLink: [1, "addParticipRouterLink"], collectorId: [2, "collectorId"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.particips; var currVal_1 = "/particips/new"; var currVal_2 = 120; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2); }, null); }
export function View_ParticipsListComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\u00AB\u042F \u0441\u0434\u0430\u043C \u0415\u0413\u042D!\u00BB: \u0441\u043F\u0438\u0441\u043E\u043A \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432"])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ParticipsListComponent_1)), i1.ɵdid(3, 16384, null, 0, i5.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ParticipsListComponent_2)), i1.ɵdid(5, 16384, null, 0, i5.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.particips; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.particips; _ck(_v, 5, 0, currVal_1); }, null); }
export function View_ParticipsListComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "ng-component", [], null, null, null, View_ParticipsListComponent_0, RenderType_ParticipsListComponent)), i1.ɵdid(1, 114688, null, 0, i14.ParticipsListComponent, [i12.ParticipService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ParticipsListComponentNgFactory = i1.ɵccf("ng-component", i14.ParticipsListComponent, View_ParticipsListComponent_Host_0, {}, {}, []);
export { ParticipsListComponentNgFactory as ParticipsListComponentNgFactory };
//# sourceMappingURL=particips-list.component.ngfactory.js.map