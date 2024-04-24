import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { combineLatest } from 'rxjs';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InventoryFormComponent } from './inventory/form/form.component';
import { CustomerShowComponent } from './customers/customer-show/customer-show.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerNewComponent } from './customers/customer-new/customer-new.component';
import { CustomerDeleteComponent } from './customers/customer-delete/customer-delete.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';

export const routes: Routes = [
    {
        path: 'inventory', component: InventoryComponent,
        children: [
            { path: 'new', component: InventoryFormComponent },
            { path: 'edit/:id', component: InventoryFormComponent },
        ]
    },
    {
        path: 'customers', component: CustomersComponent,
        children: [
            { path: '', component: CustomerListComponent },
            { path: 'show/:id', component: CustomerShowComponent },
            { path: 'delete/:id', component: CustomerDeleteComponent },
            { path: 'edit/:id', component: CustomerEditComponent },
            { path: 'new', component: CustomerNewComponent },

        ]
    },
    { path: 'invoices', component: InvoicesComponent },

];
