import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {
  constructor(public toastController: ToastController) {}

  async showSuccess(message: string) {
    const toast = await this.toastController.create({
      color: 'success',
      message,
      duration: 2000,
    });
    toast.present();
  }

  async showError(message: string) {
    const toast = await this.toastController.create({
      color: 'danger',
      message,
      duration: 2000,
    });
    toast.present();
  }

  async showWarning(message: string) {
    const toast = await this.toastController.create({
      color: 'warning',
      message,
      duration: 2000,
    });
    toast.present();
  }
}
