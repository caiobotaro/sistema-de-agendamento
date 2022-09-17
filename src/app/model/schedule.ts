export class Schedule {
  id!: string;
  name: string;
  phone: string;
  email: string;
  event: string;
  data: string;

  constructor(name: string, phone: string, email: string, event: string, data: string) {
    this.id = String(Math.round(Math.random() * 1000));
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.event = event;
    this.data = data;
  }
}
