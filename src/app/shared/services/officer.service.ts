import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/base-response.model';
import { UserForSelectModel } from '../models/user-select.model';

@Injectable()
export class OfficerService {
  private BASE_URL = environment.base_url;

  constructor(private http: HttpClient) {}

  getUserForSelect(): Observable<BaseResponseModel<UserForSelectModel[]>> {
    const apiUrl = `${this.BASE_URL}users/select`;

    return this.http.get<BaseResponseModel<UserForSelectModel[]>>(apiUrl);
  }
}
