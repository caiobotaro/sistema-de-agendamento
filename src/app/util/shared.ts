import { Constants } from './constants';

export class Shared {
  constructor() {}

  public static initializeWebStorage(): void {
    if (localStorage.getItem(Constants.SCHEDULES_KEY) != null) {
      return;
    }

    localStorage.setItem(Constants.SCHEDULES_KEY, JSON.stringify([]));
  }
}
