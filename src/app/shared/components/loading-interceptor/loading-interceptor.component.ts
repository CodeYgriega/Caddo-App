import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-loading-interceptor',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-interceptor.component.html',
  styleUrl: './loading-interceptor.component.css',
})
export class LoadingInterceptorComponent {
  spinnerSvc = inject(SpinnerService);

  isLoading$ = this.spinnerSvc.isLoading$;
}
