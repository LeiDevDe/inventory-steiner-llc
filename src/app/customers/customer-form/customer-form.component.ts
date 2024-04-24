import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../customer.dto';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
// to create a form to edit or create new customer
export class CustomerFormComponent implements OnInit {

  @Input() customer: Customer;
  @Output() save = new EventEmitter<Customer>();
  @Output() back = new EventEmitter();

  customerForm: FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [this.customer.id],
      firstname: [this.customer.firstName]
    })
  }

}
