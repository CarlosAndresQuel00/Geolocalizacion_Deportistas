import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  orderForm: FormGroup;

  constructor(
    private auth: AuthService,
    private toastr: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = this.formBuilder.group({
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
  }

  login(){
    if(this.email && this.password){
      this.auth.signIn(this.email, this.password);
      this.orderForm.reset();
    } else {
      this.toast('Por favor ingrese su email y contraseña!', 'warning');
    }
  }


  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'bottom',
      duration: 2000,
    });
    toast.present();
  }

}
