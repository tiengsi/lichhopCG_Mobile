import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostComponent } from './pages/post/post.component';
import { FilterScheduleComponent } from './components/filter-schedule/filter-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { MenuSidebarComponent } from '../shared/components/menu-sidebar/menu-sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { OrgContactComponent } from './pages/org-contact/org-contact.component';
import { SubordinateComponent } from './components/subordinate/subordinate.component';
import { ScheduleDetailComponent } from './components/schedule-detail/schedule-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FolderPageRoutingModule],
  declarations: [
    FolderPage,
    MenuSidebarComponent,
    HomeComponent,
    FilterScheduleComponent,
    PostComponent,
    PostDetailComponent,
    OrgContactComponent,
    SubordinateComponent,
    ScheduleDetailComponent
  ],
})
export class FolderPageModule {}
