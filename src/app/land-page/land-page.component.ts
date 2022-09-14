import { SchedulePromiseService } from './../schedule/schedule-promise.service';
import { Schedule } from './../model/schedule';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
  providers: [SchedulePromiseService],
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

  constructor(private scheduleService: SchedulePromiseService, private router: Router) { }

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
    this.scheduleService.delete(schedule.id)
    .then(() => {
      this.isShowMessage = true;
      this.isSuccess = true;
      this.message = 'O item foi removido com sucesso!';

      this.getSchedules();
    })
    .catch((e) => {
      this.isShowMessage = true;
      this.isSuccess = false;
      this.message = 'Ops! O item não pode ser removido!';
    });

  }

  getSchedules() {
    return this.scheduleService
      .getAll()
      .then((s: Schedule[]) => { this.schedules = s; })
      .catch((e) => {
        this.isShowMessage = true;
        this.isSuccess = false;
        this.message = "Erro ao carregar dados!" + e;
      });
  }

}
