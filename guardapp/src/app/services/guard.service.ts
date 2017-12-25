import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GuardService {

  private paymentUrl = 'localhost:8989';
  private productBaseUrl = 'http://' + this.paymentUrl + '/guardms/';

  constructor(private http: HttpClient) {

  }

  readRFID() {
    return this.http.get(this.productBaseUrl + '/readrfid');
  }


}
