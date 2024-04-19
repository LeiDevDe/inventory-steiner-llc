import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface Customer {
  id: number
  name: string
  firstName: string
  lastName: string
  // address: Address
  // phoneNumber: PhoneNumber[]
}

export interface Address {
  streetAddress: string
  city: string
  state: string
  postalCode: string
}

export interface PhoneNumber {
  type: string
  number: string
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Customer[] = [
  {
    "id": 1,
    "name": "John Smith",
    "firstName": "John",
    "lastName": "Smith",

    // "address":
    // {
    //   "streetAddress": "21 2nd Street",
    //   "city": "New York",
    //   "state": "NY",
    //   "postalCode": "10021"
    // },
    // "phoneNumber":
    //   [
    //     {
    //       "type": "home",
    //       "number": "212 555-1234"
    //     },
    //     {
    //       "type": "fax",
    //       "number": "646 555-4567"
    //     }
    //   ]
  },
  {
    "id": 2,
    "name": "Lei  Smith",
    "firstName": "Lei",
    "lastName": "Smith",
  }
];

/**
 * Data source for the Customers view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CustomersDataSource extends DataSource<Customer> {
  data: Customer[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Customer[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Customer[]): Customer[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Customer[]): Customer[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
