import { OnInit,ViewChild } from '@angular/core';
import { AppComponentBase } from '../app-component-base';
import { PaginationComponent, PagedInput } from './pagination.component';

export abstract class PagedListingComponentBase extends AppComponentBase  implements OnInit {

    public start: number = 0;
    public pagedInput: PagedInput = new PagedInput();
    @ViewChild(PaginationComponent) paginationComponent: PaginationComponent;

    ngOnInit(): void {
       
    }

    refresh():void{
        this.paginationComponent.ngOnInit();
    }

    showPaging(total:number):void{
        this.paginationComponent.updateInfo(total);
        this.start = (this.pagedInput.page - 1) * this.pagedInput.pageSize;
    }

    showDeleteResult(result: boolean):void{
        if(result){
            this.refresh();
            this.notify("success","提示","删除成功！")
        }else{
            this.notify("error","提示","删除失败！")
        }
    }
}