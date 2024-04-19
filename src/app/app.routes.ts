import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { combineLatest } from 'rxjs';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InventoryFormComponent } from './inventory/form/form.component';

export const routes: Routes = [
    {
        path: 'inventory', component: InventoryComponent,
        children: [
            { path: 'new', component: InventoryFormComponent },
            { path: 'edit/:id', component: InventoryFormComponent },
        ]
    },
    { path: 'customers', component: CustomersComponent },
    { path: 'invoices', component: InvoicesComponent },

];
