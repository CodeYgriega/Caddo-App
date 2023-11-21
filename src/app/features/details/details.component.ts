import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersService } from '../../shared/services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../shared/models/characters';
import { LoadingInterceptorComponent } from '../../shared/components/loading-interceptor/loading-interceptor.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, LoadingInterceptorComponent,],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  charactersSvc = inject(CharactersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  character!: Character;

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        const id = params['id'];
        this.charactersSvc.getCharacterById(id)
          .subscribe(
            character => this.character = character,
            error => this.router.navigate(['notFound'])
          )
      }
    })
  }
}
