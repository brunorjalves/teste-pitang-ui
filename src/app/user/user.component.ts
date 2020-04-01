import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  users: Array<User> = [];
  user = new User();
  msgs: Message[] = [];

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.userService.findAll()
      .subscribe(
        users => {
          this.users = <Array<User>>users;
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
  }

  save(f: NgForm) {
    if (!this.user.id) {
      this.create(this.user, f);
    } else {
      this.update(this.user, f);
    }
  }

  create(user: User, f: NgForm) {
    this.userService.save(user)
      .subscribe(
        response => {
          this.findAll();
          this.user = new User();
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Record saved successfully` });
          f.resetForm();
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
  }

  update(user: User, f: NgForm) {
    this.userService.update(user.id, user)
      .subscribe(
        response => {
          this.findAll();
          this.user = new User();
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Record successfully updated` });
          f.resetForm();
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
  }

  edit(user: User) {
    this.user = Object.assign(JSON.parse(JSON.stringify(user)));
    this.user.birthday = new Date(this.user.birthday);
  }

  remove(user: User) {
    this.userService.remove(user.id)
      .subscribe(
        () => {
          this.findAll();
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Record deleted successfully` });
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
    this.user = new User();
  }

}
