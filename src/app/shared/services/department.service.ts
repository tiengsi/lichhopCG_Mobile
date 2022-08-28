import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartmentModel, ITreeDepartmentOfficer } from 'src/app/shared/models/department.model';
import { GetOfficerRequest } from '../models/user-select.model';
import { QueryParamsModel } from '../models/query-params.model';
import { BaseResponseModel } from '../models/base-response.model';

@Injectable()
export class DepartmentService {
  private BASE_URL = environment.base_url;
  constructor(private http: HttpClient) { }

  getAll(queryParams: QueryParamsModel): Observable<BaseResponseModel<IDepartmentModel[]>> {
    const apiUrl = `${this.BASE_URL}department`;
    let params = new HttpParams()
    .set('sortOrder', queryParams.sortOrder)
    .set('sortField', queryParams.sortField);

    Object.keys(queryParams.filter).forEach((key) => {
      params = params.set(key, queryParams.filter[key]);
    });

    return this.http.get<BaseResponseModel<IDepartmentModel[]>>(
      apiUrl,
      { params }
    );
  }

  getAllForSelect(): Observable<BaseResponseModel<IDepartmentModel[]>> {
    const apiUrl = `${this.BASE_URL}department/get-all-active`;

    return this.http.get<BaseResponseModel<IDepartmentModel[]>>(apiUrl);
  }

  getDepartmentOfficer(model: GetOfficerRequest): Observable<BaseResponseModel<ITreeDepartmentOfficer[]>> {
    const apiUrl = `${this.BASE_URL}department/get-department-officer`;
    return this.http.post<BaseResponseModel<ITreeDepartmentOfficer[]>>(apiUrl, model);
  }
}
