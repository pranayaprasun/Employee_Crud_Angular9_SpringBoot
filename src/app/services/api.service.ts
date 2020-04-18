import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static apiDomain = 'http://localhost:8080';
  static http: Http;

  constructor(private http: Http) {
    this.http = http;
  }

  getRequest(apiUrl) {

  }
  public static postRequest(apiUrl, modelObject, specificHeader) {
    let empHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiDomain + apiUrl, JSON.stringify(modelObject), { headers: empHeaders });
  }
  private static handleError(error: any): Promise<Array<any>> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public static getDomainName() {
    return 'http://localhost:8080';
  }

  public getHostName() {
    // return this.window.location.hostname;
  }

}
