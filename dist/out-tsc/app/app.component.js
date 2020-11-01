import { __assign, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
var AppComponent = /** @class */ (function () {
    function AppComponent(router, iconSet) {
        this.router = router;
        this.iconSet = iconSet;
        // iconSet singleton
        iconSet.icons = __assign(__assign(__assign({}, freeSet), brandSet), flagSet);
    }
    AppComponent.prototype.ngOnInit = function () {
        this.router.events.subscribe(function (evt) {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    };
    AppComponent = __decorate([
        Component({
            // tslint:disable-next-line
            selector: 'body',
            template: '<router-outlet></router-outlet>',
            providers: [IconSetService],
        }),
        __metadata("design:paramtypes", [Router, IconSetService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map