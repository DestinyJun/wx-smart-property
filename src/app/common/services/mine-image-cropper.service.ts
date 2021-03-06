import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MineImageCropperService {

  constructor(
    private http: HttpClient
  ) { }

  public uploadImage (bady): Observable<any> {
    return this.http.post(environment.dev_test_url + `/wx/indexuploadphoto`, bady);
  }
}
