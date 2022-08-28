import { UserForSelectModel } from './../../../shared/models/user-select.model';
import { Component, OnInit } from '@angular/core';
import { OfficerService } from 'src/app/shared/services/officer.service';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-filter-schedule',
    templateUrl: './filter-schedule.component.html',
    styleUrls: ['./filter-schedule.component.css'],
})
export class FilterScheduleComponent implements OnInit {
    weeks = [];
    weekSelected = 1;
    hosts: UserForSelectModel[] = [
        {
            id: 0,
            fullName: '--- Chọn người chủ trì ---',
        },
    ]; // Người chủ trì
    hostSelected = 0;
    startDateOfWeek: Date;
    endDateOfWeek: Date;
    position = '';

    constructor(
        private officerService: OfficerService,
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.loadWeeks();
        this.loadHost();
    }

    loadHost(): void {
        this.officerService.getUserForSelect().subscribe((response) => {
            if (response.isSuccess) {
                this.hosts = this.hosts.concat(response.result);
            }
        });
    }

    loadWeeks(): void {
        for (let index = 1; index < 54; index++) {
            this.weeks.push({
                id: index,
                name: 'Tuần ' + index,
            });
        }
        const now = new Date();
        this.weekSelected = this.getWeekNumber(now);
        this.onSelectWeek(this.weekSelected);
    }

    // Get week number of the year
    getWeekNumber(date: Date): number {
        const oneJan = new Date(date.getFullYear(), 0, 1);

        // adding 1 since this.getDay()
        // returns value starting from 0
        return Math.ceil(
            ((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
        );
    }

    compareWith(o1, o2) {
        return o1 === o2;
    }

    onSelectWeek(week: number): void {
        const now = new Date();
        const oneJan = new Date(now.getFullYear(), 0, 1);
        const w = oneJan.getTime() - (3600000 * 24 * (oneJan.getDay() - 1)) + 604800000 * (week - 1);
        this.startDateOfWeek = new Date(w);
        this.endDateOfWeek = new Date(w + 518400000);
        this.weekSelected = week;
    }

    onSelectHost(host: number) {
        this.hostSelected = host;
    }

    dismissModal() {
        this.modalController.dismiss({
            isFilter: false,
        });
    }

    onFilter() {
        this.modalController.dismiss({
            isFilter: true,
            host: this.hostSelected,
            weekSelected: this.weekSelected,
            position: this.position
        });
    }
}
