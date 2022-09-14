import { SchedulePromiseService } from './schedule-promise.service';
import { Shared } from './../util/shared';
import { Schedule } from './../model/schedule';
import { Component, OnInit, ViewChild } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [SchedulePromiseService],
})
export class ScheduleComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  schedule: Schedule = new Schedule('', '', '', '', '');

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;
  title: String = '';
  label: String = '';
  idParam: number = 0;

  constructor(private route: ActivatedRoute, private scheduleService: SchedulePromiseService, private router: Router) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id']!;

    if (this.idParam == 0) {
      this.title = 'Novo Evento';
    } else {
      this.scheduleService
      .getById(this.idParam.toString())
      .then((s: Schedule[]) => { this.schedule = s[0]; })
      .catch((e) => {
        this.isShowMessage = true;
        this.isSuccess = false;
        this.message = "Erro ao carregar dados!" + e;
      });
      this.title = 'Editar Evento';
      this.label = 'active';
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.idParam == 0) {
      this.scheduleService.save(this.schedule);
    } else {
      this.scheduleService.update(this.schedule);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';

    this.form.reset();
    this.router.navigate(['/']);
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
