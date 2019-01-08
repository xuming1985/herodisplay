import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ProjectService, BProjectModuleDto } from '../../../shared/service-proxy/bug.service'

@Component({
  selector: 'app-add-module-project',
  templateUrl: './add-module-project.component.html',
  styleUrls: ['./add-module-project.component.css']
})
export class AddModuleProjectComponent implements OnInit {

  @ViewChild('addModuleProjectModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  projectModule: BProjectModuleDto = null;

  constructor(private service: ProjectService) { }

  ngOnInit() {
  }

  save(): void {

    this.saving = true;
    this.service.addModule(this.projectModule)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        // this.notify.info(this.l('SavedSuccessfully'));
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
