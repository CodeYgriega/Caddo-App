import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogModule,
  ],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.css',
})
export class CreateCharacterComponent {
  fb = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      years: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      img: ['', [Validators.required]],
    });
  }

  onFileSelected(_event: any) {
    if (_event.target.files && _event.target.files[0]) {
      const file = _event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.form.patchValue({ img: e.target?.result });
      };

      reader.readAsDataURL(file);
    }
  }
}
