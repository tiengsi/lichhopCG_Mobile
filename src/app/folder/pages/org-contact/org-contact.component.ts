import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITreeDepartmentOfficer } from 'src/app/shared/models/department.model';
import { GetOfficerRequest } from 'src/app/shared/models/user-select.model';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-org-contact',
  templateUrl: './org-contact.component.html',
  styleUrls: ['./org-contact.component.scss']
})
export class OrgContactComponent implements OnInit, OnDestroy {
  keyFilter = '';
  departmentOfficers: ITreeDepartmentOfficer[] = [];
  isLoading = true;
  sortField = 'Name';

  constructor(private departmentService: DepartmentService
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.getAllOfficer();
  }

  getAllOfficer(): void {
    const payLoad: GetOfficerRequest = {
      filter: this.keyFilter,
      sortField: this.sortField
    };

    this.departmentService.getDepartmentOfficer(payLoad).subscribe((res) => {
      if (res.isSuccess) {
        this.departmentOfficers = res.result;
        this.isLoading = false;
      }
    });
  }
}
