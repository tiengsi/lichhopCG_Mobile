import { AuthService } from './../../../shared/services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
  EMAIL: 'canboa',
  PASSWORD: 'Canbo1234',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  private returnUrl: any;
  constructor(
    private toastService: ToastService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.initForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params.returnUrl || 'home';
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        DEMO_PARAMS.EMAIL,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        DEMO_PARAMS.PASSWORD,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
        ]),
      ],
    });
  }

  login() {
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const authData = {
      username: controls.username.value,
      password: controls.password.value,
    };

    this.authService.login(authData.username, authData.password).pipe(
      tap((response) => {
        if (response.isSuccess) {
          localStorage.setItem(environment.authTokenKey, JSON.stringify(response.result));
          this.router.navigateByUrl(this.returnUrl); // Main page
        } else {
          this.toastService.showError('Tài khoản hoặc mật khẩu không đúng!');
        }
      }),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    ).subscribe();
  }
}
