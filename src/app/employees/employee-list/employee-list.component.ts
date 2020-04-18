import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/model/employee.model';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  private employees: Employee[];
  uploadForm: FormGroup;
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'emailId', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.service.getEmployeesList().then(
      employees => {
        this.employees = employees;
        if (this.employees.length != 0) {
          this.listData = new MatTableDataSource(employees);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(rowId) {

    for (let employee of this.employees) {
      if (employee['id'] == rowId) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "50%";
        this.service.form.controls['id'].setValue(employee['id']);
        this.service.form.controls['firstName'].setValue(employee['firstName']);
        this.service.form.controls['lastName'].setValue(employee['lastName']);
        this.service.form.controls['emailId'].setValue(employee['emailId']);
        this.dialog.open(EmployeeComponent, dialogConfig);
      }
    }
  }

  onDelete(rowId) {
    this.service.deleteEmployee(rowId);
    window.location.reload();
    this.notificationService.warn('! Deleted successfully');
  }

}
