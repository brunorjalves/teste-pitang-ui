import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CarService } from '../services/car.service';
import { Car } from '../shared/car.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [MessageService]
})
export class CarComponent implements OnInit {

  car: Car;
  cars: Car[];
  msgs: Message[] = [];

  constructor(
    private carService: CarService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.car = new Car();
    this.findAll();
  }

  findAll() {
    this.carService.findAll()
      .subscribe(
        cars => {
          this.cars = <Array<Car>>cars;
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
  }

  save(f: NgForm) {
    if (!this.car.id) {
      this.create(this.car, f);
    } else {
      this.update(this.car, f);
    }
  }

  create(car: Car, f: NgForm) {
    this.carService.save(car)
      .subscribe(
        response => {
          this.findAll();
          this.car = new Car();
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Record saved successfully` });
          f.resetForm();
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
  }

  update(car: Car, f: NgForm) {
    this.carService.update(car.id, car)
      .subscribe(
        response => {
          this.findAll();
          this.car = new Car();
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Record successfully updated` });
          f.resetForm();
        },
        error => {
          this.messageService.clear();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}` });
        });
  }

  edit(car: Car) {
    this.car = Object.assign(JSON.parse(JSON.stringify(car)));
  }

  remove(car: Car) {
    this.carService.remove(car.id)
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
    this.car = new Car();
  }

}
