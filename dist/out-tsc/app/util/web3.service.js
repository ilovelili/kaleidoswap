import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var Web3 = require('web3');
var contract = require('@truffle/contract');
var Web3Service = /** @class */ (function () {
    function Web3Service() {
        var _this = this;
        this.ready = false;
        this.accountsObservable = new Subject();
        window.addEventListener('load', function (event) {
            _this.bootstrapWeb3();
        });
    }
    Web3Service.prototype.bootstrapWeb3 = function () {
        var _this = this;
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.ethereum !== 'undefined') {
            // Use Mist/MetaMask's provider
            window.ethereum.enable().then(function () {
                _this.web3 = new Web3(window.ethereum);
            });
        }
        else {
            console.log('No web3? You should consider trying MetaMask!');
            // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
            Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        setInterval(function () { return _this.refreshAccounts(); }, 100);
    };
    Web3Service.prototype.artifactsToContract = function (artifacts) {
        return __awaiter(this, void 0, void 0, function () {
            var delay, contractAbstraction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.web3) return [3 /*break*/, 3];
                        delay = new Promise(function (resolve) { return setTimeout(resolve, 100); });
                        return [4 /*yield*/, delay];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.artifactsToContract(artifacts)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        contractAbstraction = contract(artifacts);
                        contractAbstraction.setProvider(this.web3.currentProvider);
                        return [2 /*return*/, contractAbstraction];
                }
            });
        });
    };
    Web3Service.prototype.refreshAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.web3.eth.getAccounts()];
                    case 1:
                        accs = _a.sent();
                        console.log('Refreshing accounts');
                        // Get the initial account balance so it can be displayed.
                        if (accs.length === 0) {
                            console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
                            return [2 /*return*/];
                        }
                        if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
                            console.log('Observed new accounts');
                            this.accountsObservable.next(accs);
                            this.accounts = accs;
                        }
                        this.ready = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Web3Service = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], Web3Service);
    return Web3Service;
}());
export { Web3Service };
//# sourceMappingURL=web3.service.js.map