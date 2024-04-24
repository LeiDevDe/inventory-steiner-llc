import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-customer-show',
  standalone: true,
  imports: [AsyncPipe, MatCard],
  templateUrl: './customer-show.component.html',
  styleUrl: './customer-show.component.css'
})
export class CustomerShowComponent implements OnInit {
  route = inject(ActivatedRoute)
  customerService = inject(CustomerService)
  customer: Customer;
  customerObservable: Observable<Customer>;

  async ngOnInit(): Promise<void> {
    const id: Number = +(this.route.snapshot.paramMap.get('id') || 0)
    this.customerObservable = this.customerService.getById(id);
    this.customer = await lastValueFrom(this.customerObservable);
    console.log(this.customer)
  }
}
