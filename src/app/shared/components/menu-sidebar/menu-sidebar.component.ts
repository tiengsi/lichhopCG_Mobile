import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastService } from './../../services/toast.service';
import { CategoryService } from './../../services/category.service';
import { AuthModel } from './../../models/auth.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { CategoryModel, ECategoryType } from '../../models/category.model';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit {
  public user: AuthModel;
  categories: CategoryModel[];
  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private router: Router,
    private iab: InAppBrowser
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  ngOnInit() {
    // this.loadUser();
    this.loadMenu();
  }

  loadUser() {
    const userInfo = this.authService.getToken();
    const pUserInfo: AuthModel = JSON.parse(userInfo);
    this.user = pUserInfo;
  }

  loadMenu() {
    this.categoryService.getAllByMenu('menu-top').subscribe((response) => {
      if (response.isSuccess) {
        this.categories = response.result;
      } else {
        this.toastService.showError('Đã có lỗi xảy ra khi tải danh mục!');
      }
    });
  }

  login() {
    this.iab.create('http://lichhop.cangio.tphcm.gov.vn/admin', '_blank');
  }

  generateCategoryLink(category: CategoryModel): string {
    let cateUrl = null;
    switch (category.typeCode) {
      case ECategoryType.Article:
        cateUrl = `/bai-viet/${category.categoryCode}`;
        break;
      case ECategoryType.Post:
        cateUrl = `/tin/${category.categoryCode}`;
        break;
      case ECategoryType.Schedule:
        cateUrl = `/lich-hop/${category.categoryCode}`;
        break;
      case ECategoryType.Link:
        cateUrl = category.link;
        break;
      default:
        cateUrl = category.link;
    }

    return cateUrl;
  }
}
