import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { lastValueFrom } from 'rxjs';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.dto';
import { MatCardModule } from '@angular/material/card';
import { InventoryFormComponent } from './form/form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,
    MatCardModule, InventoryFormComponent,
    RouterOutlet
  ]
})
export class InventoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Inventory>;
  dataSource = new MatTableDataSource<Inventory>();

  showForm: Boolean = false;
  inventory!: Inventory;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'quantity', 'editedDate', 'storagePlace',
    'actions'
  ];

  constructor(private inventoryService: InventoryService) { }



  ngAfterViewInit(): void {
    this.loadInventories();
  }
  async loadInventories() {
    const inventories = await lastValueFrom(this.inventoryService.getAll())
    this.dataSource = new MatTableDataSource(inventories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onClick() {
    this.showForm = true;
  }
  hideInventoryForm() {
    this.showForm = false;
    this.loadInventories();
  }
  async onSave(inventory: Inventory) {
    const save = lastValueFrom(this.inventoryService.save(inventory));
    console.log("save new inventory item in the inventoryComponent", inventory);
    this.hideInventoryForm();
  }

  onEditInventoryClick(inventory: Inventory) {
    console.log("edit inventory item", inventory)
    this.showForm = true
  }


}
