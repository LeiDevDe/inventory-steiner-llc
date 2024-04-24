import { AfterViewInit, Component, inject, NgModule, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from './customer.service';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }    
  `,
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCard,
    RouterModule
  ]
})
export class CustomersComponent {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<Customer>;
  // dataSource = new MatTableDataSource<Customer>();

  // customerService = inject(CustomerService)
  // /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'name'];

  // ngAfterViewInit(): void {
  //   this.loadCustomers()
  // }

  // async loadCustomers(): Promise<void> {
  //   const customers = await lastValueFrom(this.customerService.getAll());
  //   this.dataSource = new MatTableDataSource(customers);
  //   this.table.dataSource = this.dataSource;
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }
  // onAddNewClick() {
  //   // this.customerService.save(customer<Customer>)
  // }
}
