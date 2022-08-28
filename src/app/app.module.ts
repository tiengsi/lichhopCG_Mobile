import { PostService } from './shared/services/post.service';
import { UserGuardService } from './shared/guards/user-guard';
import { AuthService } from './shared/services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastService } from './shared/services/toast.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, TokenInterceptor } from './shared/interceptors/http.token.interceptor';
import { CategoryService } from './shared/services/category.service';
import { OfficerService } from './shared/services/officer.service';
import { ScheduleService } from './shared/services/schedule.service';
import { DepartmentService } from './shared/services/department.service';
import { FileViewerComponent } from './folder/pages/file-viewer/file-viewer.component';

@NgModule({
  declarations: [AppComponent, FileViewerComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    AuthService,
    CategoryService,
    OfficerService,
    PostService,
    ScheduleService,
    ToastService,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    DepartmentService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
