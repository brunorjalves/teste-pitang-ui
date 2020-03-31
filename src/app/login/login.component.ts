import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { MessageService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  user: User;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.user = new User();
    this.returnUrl = this.activedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authenticationService.login(this.user.login, this.user.password).
      subscribe(
        (response: any) => {
          localStorage.setItem('userToken', JSON.stringify(response.jwttoken));
          let user = new User();
          user.login = this.user.login;
          user.password = this.user.password;
          user.token = response.jwttoken;
          this.authenticationService.currentUserSubject.next(user);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
  }

}
