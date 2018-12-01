import { Injectable } from '@angular/core';

@Injectable()
export class InscriptionService {

  constructor() { }
}

export class Inscription{
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  password: string;
  captchaResponse: string | undefined;
}
