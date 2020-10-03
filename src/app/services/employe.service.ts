import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Get all employees data from local api
   */
  getAllData() {
    return this.httpClient.get(`${BASE_URL}/liste`);
  }

  /**
   * Add a new employee
   */
  addEmploye(body) {
    return this.httpClient.post(`${BASE_URL}/`, body);
  }

  /**
   * Delete an employee
   */
  delEmploye(id) {
    return this.httpClient.delete(`${BASE_URL}/${id}`)
  }

  /**
   * Edit employee
   */
  editEmploye(body) {
    return this.httpClient.put(`${BASE_URL}/`, body);
  }

}
