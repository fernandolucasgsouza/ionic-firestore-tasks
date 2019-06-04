import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { NavController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-logout-button',
  template: `
  <ion-buttons slot="start">
    <ion-button (click)="logOut()">
        <ion-icon slot="icon-only" name="exit"></ion-icon>
    </ion-button>
  </ion-buttons>
  `,
})
export class LogoutButtonComponent implements OnInit {
  @Input() menuId: string;

  constructor(
    private _authService: AuthService,
    private _menuCtrl: MenuController,
    private _ovelayService: OverlayService,
    private _navCtrl: NavController
  ) { }

  async ngOnInit(): Promise<void> {
    if (!(await this._menuCtrl.isEnabled(this.menuId))) {
      this._menuCtrl.enable(true, this.menuId)
    }
  }

  async logOut(): Promise<void> {
    await this._ovelayService.alert({
      message: 'Você deseja realmente sair do sistema?',
      buttons: [{
        text: 'Sim',
        handler: async () => {
          await this._authService.logout();
          this._menuCtrl.enable(false, this.menuId)
          this._navCtrl.navigateRoot('/login');
        }
      },
        'Não'
      ]
    })


  }
}
