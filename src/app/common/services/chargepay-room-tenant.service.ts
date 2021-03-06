import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargepayRoomTenantService {

  constructor(
    private http: HttpClient
  ) { }
  public getRoomTenantList (parmas): Observable<any> {
      return this.http.post(environment.dev_test_url + `/wx/roomuser`, parmas);
  }
  public getRoomOwnerList (parmas): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/indexroomusergetporperty`, parmas);
  }
}
