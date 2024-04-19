import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Inventory } from '../inventory.dto';

@Component({
  selector: 'inventory-form',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormField, MatButtonModule,
    MatInputModule
  ],
  templateUrl: './form.component.html',
  styles: ``
})
export class InventoryFormComponent {
  // constructor(private formBuilder: FormBuilder){}
  private formBuilder = inject(FormBuilder);
  @Output() back = new EventEmitter();
  @Output() save = new EventEmitter<Inventory>();
  inventoryForm = this.formBuilder.group({
    id: [null],
    name: ["", Validators.required],
    description: ["", Validators.required],
    quantity: ["", Validators.min(0)],
    storagePlace: [null],
    comment: [null],

  });
  @Input()
  set inventory(inventory: Inventory) {
    this.inventoryForm.setValue(inventory);
  }
  onSubmit() {
    console.log('Submit', this.inventoryForm.value)
    this.save.emit(this.inventoryForm.value as Inventory)
  }
  onBack() {
    this.back.emit();
  }

}
