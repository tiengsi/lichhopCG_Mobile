import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseResponseModel } from "../models/base-response.model";
import { PageResponseModel } from "../models/page-response.model";
import { QueryParamsModel } from "../models/query-params.model";
import {
    AuditScheduleModel,
    ScheduleByWeekModel,
    ScheduleFilesAttachment,
    ScheduleModel,
} from "../models/schedule.model";

@Injectable()
export class ScheduleService {
    private BASE_URL = environment.base_url;
    constructor(private http: HttpClient) { }

    getAll(
        queryParams: QueryParamsModel
    ): Observable<BaseResponseModel<PageResponseModel<ScheduleModel[]>>> {
        const apiUrl = `${this.BASE_URL}schedules`;
        // tslint:disable-next-line:variable-name
        let _params = new HttpParams()
            // .set('filter', queryParams.filter)
            .set("sortOrder", queryParams.sortOrder)
            .set("sortField", queryParams.sortField)
            .set("index", queryParams.pageNumber.toString())
            .set("pageSize", queryParams.pageSize.toString());
        Object.keys(queryParams.filter).forEach((key) => {
            _params = _params.set(key, queryParams.filter[key]);
        });
        return this.http.get<BaseResponseModel<PageResponseModel<ScheduleModel[]>>>(
            apiUrl,
            { params: _params }
        );
    }

    getAllByWeekForFE(
        queryParams: QueryParamsModel
    ): Observable<BaseResponseModel<ScheduleByWeekModel[]>> {
        const apiUrl = `${this.BASE_URL}schedules/new-version-by-week-fe`;
        // tslint:disable-next-line:variable-name
        let _params = new HttpParams()
            .set("sortOrder", queryParams.sortOrder)
            .set("sortField", queryParams.sortField)
            .set("index", queryParams.pageNumber.toString())
            .set("pageSize", queryParams.pageSize.toString());
        Object.keys(queryParams.filter).forEach((key) => {
            _params = _params.set(key, queryParams.filter[key]);
        });
        return this.http.get<BaseResponseModel<ScheduleByWeekModel[]>>(apiUrl, {
            params: _params,
        });
    }

    getScheduleById(id: number): Observable<BaseResponseModel<ScheduleModel>> {
        const apiUrl = `${this.BASE_URL}schedules/${id}`;
        return this.http.get<BaseResponseModel<ScheduleModel>>(apiUrl);
    }

    getScheduleHistory(
        scheduleId: number
    ): Observable<BaseResponseModel<AuditScheduleModel[]>> {
        const apiUrl = `${this.BASE_URL}schedules/history/${scheduleId}`;
        return this.http.get<BaseResponseModel<AuditScheduleModel[]>>(apiUrl);
    }

    getAllFilesAttachments(
        scheduleId: number
    ): Observable<BaseResponseModel<ScheduleFilesAttachment[]>> {
        const apiUrl = `${this.BASE_URL}schedules/getAllFilesAttachmentByScheduleId/${scheduleId}`;
        return this.http.get<BaseResponseModel<ScheduleFilesAttachment[]>>(apiUrl);
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
