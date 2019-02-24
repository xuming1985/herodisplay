import { ToastrService } from 'ngx-toastr';

export abstract class AppComponentBase {
    saving: boolean = false;
    constructor(public toastr: ToastrService) {

    }

    notify(type: string, title: string, message: string): void {

        var options = {
            positionClass: "toast-bottom-right",
            showDuration: 1000,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            closeButton: true
        }

        if (type == "success") {
            this.toastr.success(message, title, options);
        } else if (type == "info") {
            this.toastr.info(message, title, options);
        } else if (type == "warning") {
            this.toastr.warning(message, title, options);
        } else if (type == "error") {
            this.toastr.error(message, title, options);
        }
    }

}