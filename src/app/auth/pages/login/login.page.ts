import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthProvider } from 'src/app/core/services/auth/auth.types';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;
  public authProviders = AuthProvider
  public configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Criar conta'
  }
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _overlayService: OverlayService,
    private _navCtrl: NavController,
    private _menuCtrl: MenuController,
    private _route: ActivatedRoute
  ) { }

   ngOnInit() {
    this._createForm();
  }

  private _createForm() {
    this.form = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get email(): FormControl {
    return <FormControl>this.form.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.form.get('password');
  }

  get name(): FormControl {
    return <FormControl>this.form.get('name');
  }


  changeAuthActions(): void {
    this.configs.isSignIn = !this.configs.isSignIn;

    const { isSignIn } = this.configs;

    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Criar conta' : 'Já tenho conta';

    !isSignIn
      ? this.form.addControl('name', this.nameControl)
      : this.form.removeControl('name');
  }
  async onSubmit(provider: AuthProvider): Promise<void> {

    const loading = await this._overlayService.loading();
    try {
      const credential = await this._authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.form.value,
        provider
      });

      this._navCtrl.navigateForward(this._route.snapshot.queryParamMap.get('redirect') || '/tasks');
    } catch (e) {
      this._overlayService
        .toast('error', { message: `Ocorreu um erro: ${e.message}` })
    } finally {
      loading.dismiss();
    }
  }

}
