import { ScheduleStorageService } from './../schedule/schedule-storage.service';
import { Schedule } from './../model/schedule';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
  providers: [ScheduleStorageService],
})
export class LandPageComponent implements OnInit {

  isHideProperty = false;

  schedules?: Schedule[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;
  title: String = '';

  key: string = 'data';
  reverse: boolean = false;

  sort(key: string) {
      this.key = key;
      this.reverse = !this.reverse;
  }

  constructor(private scheduleService: ScheduleStorageService, private router: Router) { }

  ngOnInit(): void {
    this.schedules = this.scheduleService.getUsers();
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
    let response: boolean = this.scheduleService.delete(schedule.id);
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'O item foi removido com sucesso!';
    } else {
      this.message = 'Ops! O item não pode ser removido!';
    }
    this.schedules = this.scheduleService.getUsers();
  }

}
