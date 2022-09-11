import { Shared } from './../util/shared';
import { ScheduleStorageService } from './schedule-storage.service';
import { Schedule } from './../model/schedule';
import { Component, OnInit, ViewChild } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleStorageService],
})
export class ScheduleComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  schedule!: Schedule;

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;
  title: String = '';
  label: String = '';

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleStorageService, private router: Router) { }

  ngOnInit(): void {
    let idParam = this.route.snapshot.params['id']!;

    if (idParam == 0) {
      Shared.initializeWebStorage();
      this.schedule = new Schedule('', '', '', '', '');
      this.title = 'Novo Evento';
    } else {
      this.schedule = this.scheduleService.get(idParam);
      this.title = 'Editar Evento';
      this.label = 'active';
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.scheduleService.isExist(this.schedule.id)) {
      this.scheduleService.save(this.schedule);
    } else {
      this.scheduleService.update(this.schedule);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';

    this.form.reset();
    this.schedule = new Schedule('', '', '', '', '');
    this.router.navigate(['/']);
  }

  onDelete(name: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover ' + name
    );
    if (!confirmation) {
      return;
    }
    let response: boolean = this.scheduleService.delete(name);
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'O item foi removido com sucesso!';
    } else {
      this.message = 'Ops! O item não pode ser removido!';
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
