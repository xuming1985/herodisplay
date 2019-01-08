import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { ProjectService, BProjectDto } from '../../../shared/service-proxy/bug.service'

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  @ViewChild('editProjectModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  project: BProjectDto = null;

  constructor(private service: ProjectService) { }

  ngOnInit() {
  }

  save(): void {

    this.saving = true;
    this.service.save(this.project)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        // this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }

  show(project: BProjectDto): void {
    if (project == null) {
      this.project = new BProjectDto();
    } else {
      this.project = project;
    }

    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }

}
