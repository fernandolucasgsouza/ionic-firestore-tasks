import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AlertOptions, ToastOptions, LoadingOptions } from '@ionic/core';

export enum typeMsg {
  success = 'success',
  error = 'error',
  warning = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _toastCtrl: ToastController
  ) { }

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this._alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this._loadingCtrl.create({
      message: 'Aguarde...',
      ...options
    });
    await loading.present();
    return loading;
  }

  async toast(type_msg: 'success' | 'error' | 'warning', options?: ToastOptions, ): Promise<HTMLIonToastElement> {

    const toast = await this._toastCtrl.create({
      position: 'bottom',
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'ok',
      color: this._setColorMessage(type_msg),
      ...options
    });
    await toast.present();
    return toast;
  }

  private _setColorMessage(type_message: string, ) {
    let set_color: string;

    switch (type_message) {
      case typeMsg.success:
        set_color = 'success'
        break;
      case typeMsg.error:
        set_color = 'danger'
        break;
      case typeMsg.warning:
        set_color = 'warning'
        break;
      default:
        set_color = 'dark'
        break;
    }
    return set_color;
  }
}
