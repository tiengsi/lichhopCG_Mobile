import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/base-response.model';
import { CategoryModel } from '../models/category.model';

@Injectable()
export class CategoryService {
    private BASE_URL = environment.base_url;
    constructor(private http: HttpClient) { }

    getAllByMenu(
        menu: string
    ): Observable<BaseResponseModel<CategoryModel[]>> {
        const apiUrl = `${this.BASE_URL}categories/${menu}/menu`;

        return this.http.get<BaseResponseModel<CategoryModel[]>>(
            apiUrl,
        );
    }

    getByCategoryCode(
        code: string
    ): Observable<BaseResponseModel<string>> {
        const apiUrl = `${this.BASE_URL}categories/${code}/code`;

        return this.http.get<BaseResponseModel<string>>(
            apiUrl,
        );
    }

    getSettingValueByCode(
        key: string
    ): Observable<BaseResponseModel<string>> {
        const apiUrl = `${this.BASE_URL}settings/${key}`;

        return this.http.get<BaseResponseModel<string>>(
            apiUrl,
        );
    }
}
