import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  title: String = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let actionParam = this.route.snapshot.params['action']!;

    if (actionParam == 'ins') {
      this.title = "Salvar";
    } else {
      this.title = "Editar";
    }
  }

}
