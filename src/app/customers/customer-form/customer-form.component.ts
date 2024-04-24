import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../customer.dto';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,

  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
// to create a form to edit or create new customer
export class CustomerFormComponent implements OnInit {

  @Input({ required: true }) customer: Customer;
  @Output() save = new EventEmitter<Customer>();
  @Output() back = new EventEmitter();
  customerForm: FormGroup;

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [this.customer.id],
      firstName: [this.customer.firstName],
      lastName: [this.customer.lastName],
      comment: [this.customer.comment],
      address: this.formBuilder.group(
        {
          street: [this.customer.address.street],
          city: [this.customer.address.city],
          region: [this.customer.address.region],
          postalCode: [this.customer.address.postalCode],
          county: [this.customer.address.country]
        }
      )
    })
  }
  onSubmit() {
    this.save.emit(this.customerForm.value as Customer);
  }
  onBack(event) {
    event.preventDefault();
    this.back.emit();

  }
}

