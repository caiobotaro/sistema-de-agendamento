import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Constants } from './../util/constants';
import { Schedule } from './../model/schedule';

import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleStorageService {
  schedules!: Schedule[];
  constructor() {
    this.schedules = WebStorageUtil.get(Constants.SCHEDULES_KEY);
  }

  save(schedule: Schedule) {
    this.schedules = WebStorageUtil.get(Constants.SCHEDULES_KEY);
    this.schedules.push(schedule);
    WebStorageUtil.set(Constants.SCHEDULES_KEY, this.schedules);
  }

  update(schedule: Schedule) {
    this.schedules = WebStorageUtil.get(Constants.SCHEDULES_KEY);
    this.delete(schedule.id.valueOf());
    this.save(schedule);
  }

  delete(id: string): boolean {
    this.schedules = WebStorageUtil.get(Constants.SCHEDULES_KEY);
    this.schedules = this.schedules.filter((s) => {
      return s.id?.valueOf() != id?.valueOf();
    });

    WebStorageUtil.set(Constants.SCHEDULES_KEY, this.schedules);
    return true;
  }

  isExist(value: string): boolean {
    this.schedules = WebStorageUtil.get(Constants.SCHEDULES_KEY);
    if (this.schedules != null) {
      for (let s of this.schedules) {
        if (s.id?.valueOf() == value?.valueOf()) {
          return true;
        }
      }
    }
    return false;
  }

  get(value: string): Schedule {
    this.schedules = WebStorageUtil.get(Constants.SCHEDULES_KEY);
    if (this.schedules != null) {
      for (let s of this.schedules) {
        if (s.id?.valueOf() == value?.valueOf()) {
          return s;
        }
      }
    }
    return new Schedule('', '', '', '', '');
  }

  getUsers(): Schedule[] {
    this.schedules = WebStorageUtil.get(Constants.SCHEDULES_KEY);
    return this.schedules;
  }
}
