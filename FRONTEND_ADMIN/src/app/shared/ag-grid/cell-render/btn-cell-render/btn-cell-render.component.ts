import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-btn-cell-render',
    templateUrl: './btn-cell-render.component.html',
})
export class BtnCellRenderComponent implements ICellRendererAngularComp, OnInit, OnDestroy {
    constructor() { }
    params: any;

    refresh(params: any): boolean {
        throw new Error('Method not implemented');
    }

    afterGuiAttached(params?: IAfterGuiAttachedParams | undefined): void {
        throw new Error('Method not implemented');
    }

    ngOnInit(): void { }

    agInit(params: any): void {
        this.params = params;
    }

    btnInforClickedHandler($event: any) {
        this.params.infoClicked(this.params.data);
    }

    btnPrintClickedHandler($event: any) {
        this.params.printClicked(this.params.data);
    }

    btnEditClickedHandler($event: any) {
        this.params.editClicked(this.params.data);
    }

    btnDeleteClickedHandler($event: any) {
        this.params.deleteClicked(this.params.data);
    }
    btnLockClickedHandler($event: any) {
        this.params.lockClicked(this.params.data);
    }
    btnUnLockClickedHandler($event: any) {
        this.params.unlockClicked(this.params.data);
    }
    btnQtvClickedHandler($event: any) {
        this.params.qtvClicked(this.params.data);
    }
    btnUnQtvClickedHandler($event: any) {
        this.params.unQtvClicked(this.params.data);
    }
    btnEnterFormulaClickedHandler($event: any) {
        this.params.enterFormulaClicked(this.params.data);
    }

    ngOnDestroy() {
    }
}