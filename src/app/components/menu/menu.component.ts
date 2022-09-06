import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isLogin: boolean = false;
  user: User = {
    userId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    createdAt: null,
  }
  uid = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.stateUser().subscribe( res => {
      if (res)
      {
        console.log('está logueado');
        //console.log(this.user);

        this.getDatosUser(res.uid);
        this.isLogin = true;
      } else {
        console.log('no está logueado')
        //console.log(this.user);
        this.initCliente();
        this.isLogin = false;
      }
    })
  }

  ngOnInit() {}

  initCliente(){
    this.uid = '';
    this.user = {
      userId: '',
      userName: '',
      userEmail: '',
      userPhone: '',
      createdAt: null,
    };
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(["/login"]);
  }

  getDatosUser(userId: string)
  {
    const path = 'Users';
    const id = userId;
    this.auth.getDoc<User>(path, id).subscribe(user =>{
      //console.log('datos ->', user);
      this.user = user;
    })
  }

}
