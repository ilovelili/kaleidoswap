import { __awaiter, __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import { MatSnackBar } from '@angular/material/snack-bar';
const metacoin_artifacts = require('../../../../build/contracts/MetaCoin.json');
let MetaSenderComponent = class MetaSenderComponent {
    constructor(web3Service, matSnackBar) {
        this.web3Service = web3Service;
        this.matSnackBar = matSnackBar;
        this.model = {
            amount: 5,
            receiver: '',
            balance: 0,
            account: ''
        };
        this.status = '';
        console.log('Constructor: ' + web3Service);
    }
    ngOnInit() {
        console.log('OnInit: ' + this.web3Service);
        console.log(this);
        this.watchAccount();
        this.web3Service.artifactsToContract(metacoin_artifacts)
            .then((MetaCoinAbstraction) => {
            this.MetaCoin = MetaCoinAbstraction;
            this.MetaCoin.deployed().then(deployed => {
                console.log(deployed);
                deployed.Transfer({}, (err, ev) => {
                    console.log('Transfer event came in, refreshing balance');
                    this.refreshBalance();
                });
            });
        });
    }
    watchAccount() {
        this.web3Service.accountsObservable.subscribe((accounts) => {
            this.accounts = accounts;
            this.model.account = accounts[0];
            this.refreshBalance();
        });
    }
    setStatus(status) {
        this.matSnackBar.open(status, null, { duration: 3000 });
    }
    sendCoin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.MetaCoin) {
                this.setStatus('Metacoin is not loaded, unable to send transaction');
                return;
            }
            const amount = this.model.amount;
            const receiver = this.model.receiver;
            console.log('Sending coins' + amount + ' to ' + receiver);
            this.setStatus('Initiating transaction... (please wait)');
            try {
                const deployedMetaCoin = yield this.MetaCoin.deployed();
                const transaction = yield deployedMetaCoin.sendCoin.sendTransaction(receiver, amount, { from: this.model.account });
                if (!transaction) {
                    this.setStatus('Transaction failed!');
                }
                else {
                    this.setStatus('Transaction complete!');
                }
            }
            catch (e) {
                console.log(e);
                this.setStatus('Error sending coin; see log.');
            }
        });
    }
    refreshBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Refreshing balance');
            try {
                const deployedMetaCoin = yield this.MetaCoin.deployed();
                console.log(deployedMetaCoin);
                console.log('Account', this.model.account);
                const metaCoinBalance = yield deployedMetaCoin.getBalance.call(this.model.account);
                console.log('Found balance: ' + metaCoinBalance);
                this.model.balance = metaCoinBalance;
            }
            catch (e) {
                console.log(e);
                this.setStatus('Error getting balance; see log.');
            }
        });
    }
    setAmount(e) {
        console.log('Setting amount: ' + e.target.value);
        this.model.amount = e.target.value;
    }
    setReceiver(e) {
        console.log('Setting receiver: ' + e.target.value);
        this.model.receiver = e.target.value;
    }
};
MetaSenderComponent = __decorate([
    Component({
        selector: 'app-meta-sender',
        templateUrl: './meta-sender.component.html',
        styleUrls: ['./meta-sender.component.css']
    }),
    __metadata("design:paramtypes", [Web3Service, MatSnackBar])
], MetaSenderComponent);
export { MetaSenderComponent };
//# sourceMappingURL=meta-sender.component.js.map