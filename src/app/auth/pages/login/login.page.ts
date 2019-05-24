import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;
  public configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Criar conta'
  }
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private _fb: FormBuilder) { }

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
  onSubmit() {
    console.log('acess', this.form.value);

  }

}
