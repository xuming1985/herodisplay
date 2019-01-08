import { Injector, OnInit,ViewChild } from '@angular/core';
import { PaginationComponent, PagedInput } from './pagination.component';

export abstract class PagedListingComponentBase implements OnInit {

    public start: number = 0;
    public pagedInput: PagedInput = new PagedInput();
    @ViewChild(PaginationComponent) paginationComponent: PaginationComponent;

    constructor() {

    }

    ngOnInit(): void {
       
    }

    refresh():void{
        this.paginationComponent.ngOnInit();
    }

    showPaging(total:number):void{
        this.paginationComponent.updateInfo(total);
        this.start = (this.pagedInput.page - 1) * this.pagedInput.pageSize;
    }
}