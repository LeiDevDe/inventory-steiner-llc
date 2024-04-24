import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Customer } from './customer.dto';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.api + 'customers');
  }
  public getById(id: Number): Observable<Customer> {
    return this.http.get<Customer>(environment.api + 'customers/' + id);
  }
  public save(customer: Customer): Observable<Customer> {
    if (customer.id)
      return this.http.put<Customer>(environment.api + `cutomers/` + customer.id, customer);
    else
      return this.http.post<Customer>(environment.api + 'customers/', customer);
  }
  public delete(id?: number): Observable<Customer> {
    return this.http.delete<Customer>(environment.api + 'customers/' + id);
  }
  public create(): Customer {
    return {
      id: 0,

      comment: '',

      firstName: '',
      lastName: '',

      address: {
        street: '',
        city: '',
        region: '',
        postalCode: 0,
        country: '',
        phone: '',
      }

    }
  }
}
