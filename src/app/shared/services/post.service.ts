import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from '../models/base-response.model';
import { PageResponseModel } from '../models/page-response.model';
import { PostModel } from '../models/post.model';
import { QueryParamsModel } from '../models/query-params.model';

@Injectable()
export class PostService {
  private BASE_URL = environment.base_url;
  constructor(private http: HttpClient) {}

  getAll(
    queryParams: QueryParamsModel
  ): Observable<BaseResponseModel<PageResponseModel<PostModel[]>>> {
    const apiUrl = `${this.BASE_URL}posts`;
    // tslint:disable-next-line:variable-name
    let _params = new HttpParams()
      // .set('filter', queryParams.filter)
      .set('sortOrder', queryParams.sortOrder)
      .set('sortField', queryParams.sortField)
      .set('index', queryParams.pageNumber.toString())
      .set('pageSize', queryParams.pageSize.toString());
    Object.keys(queryParams.filter).forEach((key) => {
      _params = _params.set(key, queryParams.filter[key]);
    });
    return this.http.get<BaseResponseModel<PageResponseModel<PostModel[]>>>(
      apiUrl,
      { params: _params }
    );
  }

  getPostById(id: number): Observable<BaseResponseModel<PostModel>> {
    const apiUrl = `${this.BASE_URL}posts/${id}`;
    return this.http.get<BaseResponseModel<PostModel>>(apiUrl);
  }
}
