import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3Service } from './web3.service';
var UtilModule = /** @class */ (function () {
    function UtilModule() {
    }
    UtilModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            providers: [
                Web3Service
            ],
            declarations: []
        })
    ], UtilModule);
    return UtilModule;
}());
export { UtilModule };
//# sourceMappingURL=util.module.js.map