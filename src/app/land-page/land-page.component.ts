import { ScheduleService } from './../schedule/schedule.service';
import { SchedulePromiseService } from './../schedule/schedule-promise.service';

import { Schedule } from './../model/schedule';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
  providers: [SchedulePromiseService, ScheduleService],
})
export class LandPageComponent implements OnInit {

  isHideProperty = false;

  schedules?: Schedule[];

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;
  title: String = '';

  key: string = 'data';
  reverse: boolean = false;

  constructor(
    private schedulePromiseService: SchedulePromiseService,
    private scheduleService: ScheduleService,
    private router: Router) { }

  sort(key: string) {
      this.key = key;
      this.reverse = !this.reverse;
  }

  ngOnInit(): void {
    this.getSchedules();
  }

  onEdit(schedule: Schedule) {
    this.router.navigate(['/horarios', schedule.id]);
  }

  onDelete(schedule: Schedule) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover ' + schedule.name + '?'
    );
    if (!confirmation) {
      return;
    }
    this.schedulePromiseService.delete(schedule.id)
    .then(() => {
      this.isShowMessage = true;
      this.isSuccess = true;
      this.message = 'O item foi removido com sucesso!';

      this.getSchedules();
    })
    .catch(() => {
      this.isShowMessage = true;
      this.isSuccess = false;
      this.message = 'Ops! O item não pode ser removido!';
    });

  }

  getSchedules() {
      return this.scheduleService
      .getAll()
      .subscribe(
        (data: Schedule[]) => {
          if (!data || data.length == 0) {
            alert('Nenhum resultado foi encontrado!');
          }
          this.schedules = data;
        },
        (error) => {
          alert(error.message);
        }
      );
  }

}
