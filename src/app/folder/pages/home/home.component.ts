import { ScheduleService } from './../../../shared/services/schedule.service';
import { DateOfWeekModel } from './../../../shared/models/date-of-week.model';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterScheduleComponent } from '../../components/filter-schedule/filter-schedule.component';
import {
    AuditScheduleModel,
    EScheduleStatus,
    ScheduleByWeekModel,
    ScheduleModel,
} from 'src/app/shared/models/schedule.model';
import { QueryParamsModel } from 'src/app/shared/models/query-params.model';
import { ScheduleDetailComponent } from '../../components/schedule-detail/schedule-detail.component';
//import { SwipeModule } from 'src/app/swipe/swipe.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    allDayOfWeek: DateOfWeekModel[] = [];
    startDateOfWeek: Date;
    endDateOfWeek: Date;
    weekSelected = 1;
    currentDay = new Date().getDay();
    currentHours = new Date().getHours();
    // currentHours = 8;
    schedules: ScheduleByWeekModel[] = [];
    schedulesSelected: ScheduleModel[] = [];
    hostSelected = 0;
    position = '';
    isLoading = false;
    tabSelected = 'morning'; // sáng
    scheduleHistory: AuditScheduleModel[] = [];
    isAllweek = 0;
    settingValueTime = 10000;

    scheduleDetail: ScheduleModel;

    get scheduleStatus(): typeof EScheduleStatus {
        return EScheduleStatus;
    }

    constructor(
        public modalController: ModalController,
        private scheduleService: ScheduleService
    ) { }

    ngOnInit() {
        this.getAllDateOfWeek();
        this.loadSchedule();
        this.getSettingValue();
        
    }
    getAllDateOfWeekFil(): void {
        this.allDayOfWeek = [];
        this.onSelectWeek(this.weekSelected);

        this.allDayOfWeek.push({
            fullDay: this.startDateOfWeek,
            day: this.getDayNameOfWeek(this.startDateOfWeek),
            number: this.startDateOfWeek.getDay(),
        });

        for (let index = 1; index < 7; index++) {
            const nextDay = new Date(
                new Date(this.startDateOfWeek).setDate(
                    this.startDateOfWeek.getDate() + index
                )
            );
            this.allDayOfWeek.push({
                fullDay: nextDay,
                day: this.getDayNameOfWeek(nextDay),
                number: nextDay.getDay(),
            });
        }


    }
    getSettingValue(): void {
        this.scheduleService
            .getSettingValueByCode('TimerSecondReload')
            .subscribe((response) => {
                if (response.isSuccess) { 
                    var temp = response.result['settingValue'];
                    if (temp.length > 0) {
                        this.settingValueTime = parseInt(temp);
                        let timer = setInterval(() => {
                            if (this.isAllweek === 1) {
                                this.onSelectAllWeek();
                                console.log("load week")
                            }
                            else {
                                this.loadSchedule(this.currentDay.toString());
                                this.selectSchedule(this.loadSession());
                                console.log("load day")
                            }
                            //you can stop the interval if you don't need it anymore
                            //clearInterval(timer)
                        }, this.settingValueTime);
                    }
                } 
            });
    }
    getAllDateOfWeek(): void {
        const now = new Date();
        this.weekSelected = this.getWeekNumber(now);
        this.allDayOfWeek = [];
        this.onSelectWeek(this.weekSelected);

        this.allDayOfWeek.push({
            fullDay: this.startDateOfWeek,
            day: this.getDayNameOfWeek(this.startDateOfWeek),
            number: this.startDateOfWeek.getDay(),
        });

        for (let index = 1; index < 7; index++) {
            const nextDay = new Date(
                new Date(this.startDateOfWeek).setDate(
                    this.startDateOfWeek.getDate() + index
                )
            );
            this.allDayOfWeek.push({
                fullDay: nextDay,
                day: this.getDayNameOfWeek(nextDay),
                number: nextDay.getDay(),
            });
        }
    }

    onSelectWeek(week: number): void {
        const now = new Date();
        const oneJan = new Date(now.getFullYear(), 0, 1);
        const w =
            oneJan.getTime() -
            3600000 * 24 * (oneJan.getDay() - 1) +
            604800000 * (week - 1);
        this.startDateOfWeek = new Date(w);
        this.endDateOfWeek = new Date(w + 518400000);
    }

    getDayNameOfWeek(day: Date): string {
        let dayName = 'Chủ Nhật';
        switch (day.getDay()) {
            case 1:
                dayName = 'Thứ 2';
                break;
            case 2:
                dayName = 'Thứ 3';
                break;
            case 3:
                dayName = 'Thứ 4';
                break;
            case 4:
                dayName = 'Thứ 5';
                break;
            case 5:
                dayName = 'Thứ 6';
                break;
            case 6:
                dayName = 'Thứ 7';
                break;
            default:
                break;
        }

        return dayName;
    }

    compareWith(o1, o2) {
        return o1 === o2;
    }

    onSelectAllWeek(): void {
        const today = this.startDateOfWeek;
        const filter = {
            host: this.hostSelected,
            locationId: -1,
            startDate: `${today.getMonth() + 1
                }/${today.getDate()}/${today.getFullYear()}`,
            endDate: `${this.endDateOfWeek.getMonth() + 1
                }/${this.endDateOfWeek.getDate()}/${this.endDateOfWeek.getFullYear()}`,
            selectAllWeek: true,
            active: 1,
            status: -1,
        };
        const queryParams = new QueryParamsModel(
            filter,
            'Asc',
            'CreatedDate',
            1,
            50
        );
        this.scheduleService
            .getAllByWeekForFE(queryParams)
            .subscribe((response) => {
                if (response.isSuccess) {
                    this.schedules = response.result;
                    if (this.schedules.length > 0) {
                        this.selectSchedule(this.loadSession());
                    }
                    this.currentDay = -1;
                }
                this.isLoading = false;
            });
        this.isAllweek = 1;
    }

    loadSession () {
        if (this.currentHours >= 12 && this.currentHours <18) {
           return this.tabSelected = 'afternoon';
        } else if (this.currentHours >= 18) {
            return this.tabSelected = 'evening';
        } else {
            return this.tabSelected = 'morning';
        }
    }

    // Data from modal when modal is dismissed
    loadSchedule(day?: string) {
        let today = new Date();

        // select change
        if (day) {
            // tslint:disable-next-line:radix
            const pDay = parseInt(day);
            let itemSelected: DateOfWeekModel;
            // tslint:disable-next-line:prefer-for-of
            for (let index = 0; index < this.allDayOfWeek.length; index++) {
                const element = this.allDayOfWeek[index];
                if (pDay === element.number) {
                    itemSelected = element;
                    break;
                }
            }
            today = itemSelected.fullDay;
            this.currentDay = pDay;
            this.tabSelected = this.loadSession();
        } else {
            this.getAllDateOfWeek();
            this.currentDay = new Date().getDay();
            this.tabSelected = this.loadSession();
            if (this.weekSelected !== this.getWeekNumber(today)) {
                today = this.startDateOfWeek; // get schedule by monday
            }
        }
        //this.isLoading = true;

        const filter = {
            host: this.hostSelected,
            locationId: -1,
            startDate: `${today.getMonth() + 1
                }/${today.getDate()}/${today.getFullYear()}`,
            endDate: `${this.endDateOfWeek.getMonth() + 1
                }/${this.endDateOfWeek.getDate()}/${this.endDateOfWeek.getFullYear()}`,
            selectAllWeek: false,
            active: 1,
            status: -1,
        };
        const queryParams = new QueryParamsModel(
            filter,
            'Asc',
            'CreatedDate',
            1,
            50
        );
        this.scheduleService
            .getAllByWeekForFE(queryParams)
            .subscribe((response) => {
                if (response.isSuccess) {
                    this.schedules = response.result;
                    if (this.schedules.length > 0) {

                        // this.schedulesSelected = this.schedules[0].morning;
                        this.schedulesSelected = this.schedules[0][this.tabSelected];
                    }
                }
                this.isLoading = false;
            });
        this.isAllweek = 0;
    }

    // Get week number of the year
    getWeekNumber(date: Date): number {
        const oneJan = new Date(date.getFullYear(), 0, 1);

        // adding 1 since this.getDay()
        // returns value starting from 0
        return Math.ceil(
            ((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay()) / 7
        );
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: FilterScheduleComponent,
            cssClass: 'schedule-modal',
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned.data.isFilter) {
                this.hostSelected = dataReturned.data.host;
                this.position = dataReturned.data.position;
                this.weekSelected = this.position = dataReturned.data.weekSelected;
                this.loadScheduleByAllDayOfWeek();
            }
        });

        return await modal.present();
    }
    loadScheduleByAllDayOfWeek(): void {
        const today = new Date();
        this.getAllDateOfWeekFil();
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < this.allDayOfWeek.length; index++) {
            // reset isActive to false
            const element = this.allDayOfWeek[index];
        }

        //this.isAllDayOfWeekSelected = true;

        const filter = {
            host: this.hostSelected,
            locationId: -1,
            startDate: `${this.startDateOfWeek.getMonth() + 1
                }/${this.startDateOfWeek.getDate()}/${this.startDateOfWeek.getFullYear()}`,
            endDate: `${this.endDateOfWeek.getMonth() + 1
                }/${this.endDateOfWeek.getDate()}/${this.endDateOfWeek.getFullYear()}`,
            selectAllWeek: true,
            active: 1,
            status: -1,
        };
        const queryParams = new QueryParamsModel(filter);
        this.scheduleService
            .getAllByWeekForFE(queryParams)
            .subscribe((response) => {
                if (response.isSuccess) {
                    this.schedules = response.result;
                    if (this.schedules.length > 0) {
                        this.schedulesSelected = this.schedules[0].morning;
                    }
                }
                this.isLoading = false;
            });

        //this.subscriptions.push(loadSub);
    }
    timeCalculator(schedule: ScheduleModel): any {        
        const now = new Date();
        const scheduleTime = schedule.scheduleTime;
        if (scheduleTime) {
            const spScheduleTime = scheduleTime.split(':');
            const hour = spScheduleTime[0];
            const minute = spScheduleTime[1];

            const prDate = new Date(schedule.scheduleDate);

            const scheduleDate = new Date(
                prDate.getFullYear(),
                prDate.getMonth(),
                prDate.getDate(),
                // tslint:disable-next-line:radix
                parseInt(hour),
                // tslint:disable-next-line:radix
                parseInt(minute)
            );

            const isLessThan = now > scheduleDate;
            if (isLessThan) {
                return {
                    time: 'Đã qua',
                    color: 'danger',
                };
            }

            if (schedule.scheduleStatus == 2 ) {
                return {
                    time: 'Lịch bị hoãn',
                    color: 'danger',
                };
            }

            const diff = scheduleDate.getTime() - now.getTime();

            const diffS = diff / 1000;

            const diffM = diffS / 60;

            const diffH = diffM / 60;

            const diffD = diffH / 24;

            if (diffD < 1) {
                if (diffH < 1) {
                    return {
                        time: `Còn ${Math.ceil(diffM)} phút`,
                        color: 'warning',
                    };
                } else {
                    return {
                        time: `Còn ${Math.ceil(diffH)} giờ`,
                        color: 'primary',
                    };
                }
            } else {
                return {
                    time: `Còn ${Math.ceil(diffD)} ngày`,
                    color: 'primary',
                };
            }
        }

        return '';
    }

    selectSchedule(partOfDay: string): void {
        this.tabSelected = partOfDay;
        if (this.currentDay < 0) {
            this.schedulesSelected = [];
            if (partOfDay === 'morning') {
                this.schedules.forEach(schedule => {
                    this.schedulesSelected = this.schedulesSelected.concat(schedule.morning);
                });
            } else if (partOfDay === 'afternoon') {
                this.schedules.forEach(schedule => {
                    this.schedulesSelected = this.schedulesSelected.concat(schedule.afternoon);
                });
            } else if (partOfDay === 'evening') {
                this.schedules.forEach(schedule => {
                    this.schedulesSelected = this.schedulesSelected.concat(schedule.evening);
                });
            }
        }
        else {
            if (partOfDay === 'morning') {
                this.schedulesSelected = this.schedules[0].morning;
            } else if (partOfDay === 'afternoon') {
                this.schedulesSelected = this.schedules[0].afternoon;
            } else if (partOfDay === 'evening') {
                this.schedulesSelected = this.schedules[0].evening;
            }
        }

    }

    async viewDetailSchedule(item: ScheduleModel) {
        const modal = await this.modalController.create({
            component: ScheduleDetailComponent,
            cssClass: 'schedule-modal',
            componentProps: {
                scheduleId: item.scheduleId
            }
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned.data.isFilter) {
                alert('detail dissmised');
            }
        });

        return await modal.present();
    }

    doRefresh(event) {
        if (this.isAllweek === 1) {
            this.onSelectAllWeek();
        }
        else {
            this.loadSchedule(this.currentDay.toString());
        }

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 400);
    }

    swipeEvent(e) {
        console.log(e);
        var swipe: any;
        //this.storage.get("ArticleId").then((value) => {
        //    this.ArticleID = value;
        //    swipe = this.ArticleID.indexOf(this.article_inner.article_id);
        //    if (e.direction == 2) {
        //        swipe = swipe + 1;
        //        this.getArticle(this.ArticleID[swipe]);
        //    }
        //    else if (e.direction == 4) {
        //        swipe = swipe - 1;
        //        this.getArticle(this.ArticleID[swipe]);
        //    }
        //})
    }
    onSwipeLeft($event) {
        console.log($event);
        //const previousItem = this.itemService.getPreviousItem(this.item.id);
        //if (previousItem) {
        //    this.navCtrl.navigateBack(['/', 'items', previousItem.id]);
        //} else {
        //    // If no previous item return to the list of items
        //    this.goBack();
        //}
    }

    onSwipeRight($event) {
        console.log($event);
        //const nextItem = this.itemService.getNextItem(this.item.id);
        //if (nextItem) {
        //    this.navCtrl.navigateForward(['/', 'items', nextItem.id]);
        //}
    }
}
