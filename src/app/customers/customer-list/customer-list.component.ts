import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';

import { lastValueFrom, Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from '../customer.dto';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatPaginator, MatTableModule, MatButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements AfterViewInit {
  customers!: Customer[];
  customerObservable!: Observable<Customer[]>;

  // constructor(private customerService: CustomerService) { }
  // async ngOnInit(): Promise<void> {
  //   this.customerObservable = this.customerService.getAll();
  //   this.customers = await lastValueFrom(this.customerObservable);
  // }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Customer>;
  dataSource = new MatTableDataSource<Customer>();

  customerService = inject(CustomerService)
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.loadCustomers()
  }

  async loadCustomers(): Promise<void> {
    const customers = await lastValueFrom(this.customerService.getAll());
    this.dataSource = new MatTableDataSource(customers);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onAddNewClick() {
    // this.customerService.save(customer<Customer>)
  }
}
