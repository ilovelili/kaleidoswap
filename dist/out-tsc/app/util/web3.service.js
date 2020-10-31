import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
const Web3 = require('web3');
const contract = require('@truffle/contract');
let Web3Service = class Web3Service {
    constructor() {
        this.ready = false;
        this.accountsObservable = new Subject();
        window.addEventListener('load', (event) => {
            this.bootstrapWeb3();
        });
    }
    bootstrapWeb3() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.ethereum !== 'undefined') {
            // Use Mist/MetaMask's provider
            window.ethereum.enable().then(() => {
                this.web3 = new Web3(window.ethereum);
            });
        }
        else {
            console.log('No web3? You should consider trying MetaMask!');
            // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
            Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        setInterval(() => this.refreshAccounts(), 100);
    }
    artifactsToContract(artifacts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.web3) {
                const delay = new Promise(resolve => setTimeout(resolve, 100));
                yield delay;
                return yield this.artifactsToContract(artifacts);
            }
            const contractAbstraction = contract(artifacts);
            contractAbstraction.setProvider(this.web3.currentProvider);
            return contractAbstraction;
        });
    }
    refreshAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const accs = yield this.web3.eth.getAccounts();
            console.log('Refreshing accounts');
            // Get the initial account balance so it can be displayed.
            if (accs.length === 0) {
                console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
                return;
            }
            if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
                console.log('Observed new accounts');
                this.accountsObservable.next(accs);
                this.accounts = accs;
            }
            this.ready = true;
        });
    }
};
Web3Service = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], Web3Service);
export { Web3Service };
//# sourceMappingURL=web3.service.js.map