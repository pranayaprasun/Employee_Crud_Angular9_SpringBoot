import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';
import { Employee } from 'src/app/model/employee.model';
import { ApiService } from './api.service';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: Http, private apiService: ApiService) { }
  private apiDomain = ApiService.getDomainName();

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
  });

  private handleError(error: any): Promise<Array<any>> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getEmployeesList(): Promise<Array<Employee>> {
    return this.http.get(this.apiDomain + "pranaya/api/employees/")
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(this.handleError);
  }

  getEmployee(id) {
    return this.http.get(this.apiDomain + "pranaya/api/employees/" + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createEmployee(employee: Employee): Promise<Array<Employee>> {
    let employeeHeaders = new Headers({ 'Content-Type': 'application/json' });
    let dataObj = '[' + JSON.stringify(employee) + ']';
    return this.http.post(this.apiDomain + "pranaya/api/employees/", dataObj, { headers: employeeHeaders })
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(this.handleError);
  }

  updateEmployee(employee: Employee, id): Promise<Array<Employee>> {
    let employeeHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiDomain + "pranaya/api/employees/" + id, JSON.stringify(employee), { headers: employeeHeaders })
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(this.handleError);
  }

  deleteEmployee(id) {
    const url = this.apiDomain + "pranaya/api/employees/" + id
    return this.http.delete(url)
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(this.handleError);
  }
  populateForm(employee) {
    this.form.setValue(employee);
  }
}
