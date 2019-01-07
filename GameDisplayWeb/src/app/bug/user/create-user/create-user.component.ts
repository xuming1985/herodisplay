import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { finalize } from 'rxjs/operators';
import { UserService, BUserDto } from '../../../shared/service-proxy/bug.service'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('createUserModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  saving: boolean = false;
  user: BUserDto = null;

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  save(): void {

    this.saving = true;
    this.service.create(this.user)
      .pipe(finalize(() => { this.saving = false; }))
      .subscribe(() => {
        // this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      });
  }

  show(): void {
    this.user = new BUserDto();
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }

}
