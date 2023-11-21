import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatChipsModule ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>()

  chipFilters = ['id', 'name', 'years', 'description'];

  chipFilterSelected = signal<string>('name');

  setChipSelected(_event: any){
    this.chipFilterSelected.set(_event.value);
  }

  search(value: string){
    if(value.trim() === '') return;
    const filterData = {
      property: this.chipFilterSelected(),
      value: value.toLowerCase()
    }

    this.onSearch.emit(filterData);
  }

}
