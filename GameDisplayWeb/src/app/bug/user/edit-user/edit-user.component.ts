import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { UserService, BUserDto, UserForEditDto} from '../../../shared/service-proxy/bug.service'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @ViewChild('editUserModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  model: UserForEditDto = null;

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  save(): void {

    this.saving = true;
    this.service.update(this.model)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        // this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }

  show(id: number): void {
    this.service.getUserForEdit(id)
    .pipe(finalize(() => {
        this.modal.show();
    }))
    .subscribe((result: UserForEditDto) => {
        this.model = result;
    });
  }

  close(): void {
    this.modal.hide();
  }


}
