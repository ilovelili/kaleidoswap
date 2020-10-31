import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaSenderComponent } from './meta-sender/meta-sender.component';
import { UtilModule } from '../util/util.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
let MetaModule = class MetaModule {
};
MetaModule = __decorate([
    NgModule({
        imports: [
            BrowserAnimationsModule,
            CommonModule,
            MatButtonModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatOptionModule,
            MatSelectModule,
            MatSnackBarModule,
            RouterModule,
            UtilModule
        ],
        declarations: [MetaSenderComponent],
        exports: [MetaSenderComponent]
    })
], MetaModule);
export { MetaModule };
//# sourceMappingURL=meta.module.js.map