import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { ProjectService, BProjectModuleDto } from '../../../shared/service-proxy/bug.service'
import { AppComponentBase } from '../../../shared/app-component-base';

@Component({
  selector: 'app-add-module-project',
  templateUrl: './add-module-project.component.html',
  styleUrls: ['./add-module-project.component.css']
})
export class AddModuleProjectComponent extends AppComponentBase implements OnInit {

  @ViewChild('addModuleProjectModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  projectModule: BProjectModuleDto = null;

  constructor(private service: ProjectService,
    public toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {

  }

  save(): void {

    this.saving = true;
    this.service.addModule(this.projectModule)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        this.notify("success", "提示", "保存成功！")
        this.close();
        this.modalSave.emit(null);
      });
  }

  show(projectId: number): void {
    this.projectModule = new BProjectModuleDto();
    this.projectModule.projectId = projectId;
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }

}
