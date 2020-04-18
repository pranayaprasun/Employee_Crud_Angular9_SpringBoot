import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public service: EmployeeService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.service.form.valid) {
      let employeeId = this.service.form.value.id;
      let firstName = this.service.form.value.firstName;
      let lastName = this.service.form.value.lastName;
      let emailId = this.service.form.value.emailId;
      let employee = new Employee(firstName, lastName, emailId);
      if (this.service.form.value.id == '') {
        this.service.createEmployee(employee);
      } else {
        this.service.updateEmployee(employee, this.service.form.value.id);
      }
      this.service.form.reset();
      this.notificationService.success('::Successfull submited');
      this.onClose();
      window.location.reload();
    }
  }
  onClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }
  onClear() {
    this.service.form.reset();
    //this.service.in
    this.notificationService.success('::Cleared');
  }

}

