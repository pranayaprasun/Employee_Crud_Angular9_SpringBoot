export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  active: boolean;

  constructor (firstName: string, lastName: string, emailId: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailId = emailId;
  }
}
