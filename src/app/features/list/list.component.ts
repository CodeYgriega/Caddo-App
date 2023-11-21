import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../../shared/services/characters.service';
import {MatTableModule} from '@angular/material/table';
import { FiltersComponent } from './components/filters/filters.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, FiltersComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  _charactersSvc = inject(CharactersService);
  
  characters$ = new BehaviorSubject<any[]>([]);
  columns = ['id', 'name', 'years', 'description'];

  ngOnInit(): void {
    this._charactersSvc.getCharacters(1, 5).subscribe((res: any) => {
      this.characters$.next(res);
    });
    
    this._charactersSvc.getCharacterById(5).subscribe(console.log);
  }

  filterCharacters(filterData: any){
    this._charactersSvc.filterCharacter(filterData.property, filterData.value)
      .subscribe((res: any) => {
        this.characters$.next(res);
      })
  }
}
