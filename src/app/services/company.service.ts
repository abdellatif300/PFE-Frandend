import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url_backend = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url_backend + 'companies');
  }


  getCompanyById(companyId: string): Observable<Company> {
    return this.http.get<Company>(this.url_backend + 'companies/' + companyId);
  }


  addCompany(formData: FormData): Observable<Company> {
    return this.http.post<Company>(`${this.url_backend}companies`, formData);
  }

  deleteCompany(companyId: any): Observable<Company> {
    return this.http.delete<Company>(this.url_backend + 'companies/' + companyId);
  }
}
