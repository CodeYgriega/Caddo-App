import { Component, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateCharacterComponent } from '../create-character/create-character.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();

  chipFilters = ['id', 'nombre', 'fechas'];

  chipFilterSelected = signal<string>('nombre');

  dialog = inject(MatDialog);

  setChipSelected(_event: any) {
    this.chipFilterSelected.set(_event.value);
  }

  search(value: string) {
    if (value.trim() === '') return;
    const filterData = {
      property: this.chipFilterSelected(),
      value: value.toLowerCase(),
    };

    this.onSearch.emit(filterData);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCharacterComponent, {
      width: '700px',
      height: '450px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.onCreate.emit(res);
    });
  }
}
