import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Inventory } from './inventory.dto';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(environment.api + "inventory")
  }
  public save(inventory: Inventory): Observable<Inventory> {
    if (inventory.id)
      return this.http.put<Inventory>(
        environment.api + 'inventory/' + inventory.id,
        inventory
      );
    return this.http.post<Inventory>(environment.api + "inventory", inventory)
  }

}
