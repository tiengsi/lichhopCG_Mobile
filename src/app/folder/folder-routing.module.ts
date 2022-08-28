import { UserGuardService } from './../shared/guards/user-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { OrgContactComponent } from './pages/org-contact/org-contact.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'tin/:categoryCode',
        component: PostComponent,
      },
      {
        path: 'tin/:categoryCode/:id',
        component: PostDetailComponent,
      },
      {
        path: 'danh-ba-co-quan',
        component: OrgContactComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
