import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../../shared/services/characters.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from './components/filters/filters.component';
import { BehaviorSubject } from 'rxjs';
import dbJson from '../../../../db.json';
import { LoadingInterceptorComponent } from '../../shared/components/loading-interceptor/loading-interceptor.component';
import { Router } from '@angular/router';
import { Character } from '../../shared/models/characters';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    FiltersComponent,
    LoadingInterceptorComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  _charactersSvc = inject(CharactersService);
  _router = inject(Router);

  page = 1;
  totalCharactersInRow = 0;
  totalCharacters = dbJson.characters.length;
  characters$ = new BehaviorSubject<Character[]>([]);
  columns = ['id', 'name', 'years', 'img'];

  ngOnInit(): void {
    this._charactersSvc.getCharacters(1, 5).subscribe(res => {
      this.characters$.next(res);
      this.totalCharactersInRow += this.characters$.value.length;
    });

    this._charactersSvc.getCharacterById(5).subscribe(console.log);
  }

  filterCharacters(filterData: {property: string, value: string}) {
    this._charactersSvc
      .filterCharacter(filterData.property, filterData.value)
      .subscribe(res => {
        this.characters$.next(res);
      });
  }

  createCharacter(character: Character) {
    if(Object.keys(character).length === 0) return;
    this._charactersSvc.createCharacter(character).subscribe();
  }

  chargeMinus() {
    this.page -= 1;
    this._charactersSvc.getCharacters(this.page, 5).subscribe(res => {
      this.totalCharactersInRow -= this.characters$.value.length;
      this.characters$.next(res);
    });
  }

  chargeMore() {
    this.page += 1;
    this._charactersSvc.getCharacters(this.page, 5).subscribe(res => {
      this.characters$.next(res);
      this.totalCharactersInRow += this.characters$.value.length;
    });
  }

  redirectDetails(id: number) {
    this._router.navigate([`list/${id}`]);
  }
}
