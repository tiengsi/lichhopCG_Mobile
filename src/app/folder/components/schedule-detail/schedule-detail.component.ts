import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  AuditScheduleModel,
  EScheduleStatus,
  ScheduleFilesAttachment,
  ScheduleModel,
} from 'src/app/shared/models/schedule.model';
import { ScheduleService } from 'src/app/shared/services/schedule.service';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss'],
})
export class ScheduleDetailComponent implements OnInit {
  scheduleDetail: ScheduleModel;
  scheduleHistory: AuditScheduleModel[] = [];
  scheduleFilesAttachment: ScheduleFilesAttachment[] = [];
  @Input() scheduleId: string;
  tabSelected = 'detail';
  pageTitle = 'Chi tiết lịch';

  get scheduleStatus(): typeof EScheduleStatus {
    return EScheduleStatus;
  }

  constructor(
    private modalController: ModalController,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    if (this.scheduleId) {
      this.getScheduleDetail(this.scheduleId);
      this.getHistory(this.scheduleId);
      this.getScheduleFilesAttachment(this.scheduleId);
    }
  }

  getScheduleFilesAttachment(scheduleId: string) {
    this.scheduleService.getAllFilesAttachments(parseInt(scheduleId, 10)).subscribe((response) => {
      if (response.isSuccess) {
        this.scheduleFilesAttachment = [];
        this.scheduleFilesAttachment = response.result as ScheduleFilesAttachment[];
      }
    });
  }

  mapScheduleStatus(value): string {
    if (value === EScheduleStatus.Pending) {
      return 'Đang soạn thảo';
    } else if (value === EScheduleStatus.Approve) {
      return 'Đã duyệt';
    } else if (value === EScheduleStatus.Pause) {
      return 'Lịch bị hoãn';
    } else if (value === EScheduleStatus.Changed) {
      return 'Lịch bị dời';
    } else if (value === EScheduleStatus.Release) {
      return 'Đã phát hành';
    }
  }

  getScheduleDetail(scheduleId: any) {
    this.scheduleService.getScheduleById(scheduleId).subscribe((response) => {
      if (response.isSuccess) {
        this.scheduleDetail = null;
        this.scheduleDetail = response.result as ScheduleModel;
      }
    });
  }

  getHistory(scheduleId: any) {
    this.scheduleService
      .getScheduleHistory(scheduleId)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.scheduleHistory = response.result;
        }
      });
  }

  dismissModal() {
    this.modalController.dismiss({
      isFilter: false,
    });
  }


  selectSchedule(partOfDay: string): void {
    this.tabSelected = partOfDay;

    switch (partOfDay) {
      case 'filesAttachment':
        this.pageTitle = 'Tài liệu họp';
        break;

      case 'detail':
        this.pageTitle = 'Chi tiết lịch';
        break;

      case 'history':
        this.pageTitle = 'Nhật ký';
        break;

      default:
        break;
    }
  }

  showFileContent(fileUrl: string){
    var z = 'https://docs.google.com/gview?url=';
    fileUrl = fileUrl.replace(z, '');
    var host = window.location.origin + '/file'
    var goToPath = host + '?url=' + fileUrl; 
    window.open(goToPath, '_blank');
  }
}
