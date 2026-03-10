import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DateStatusService } from '../../../../core/api/date-status.service';

@Component({
  selector: 'app-today-status-main',
  imports: [DatePipe],
  templateUrl: './today-status-main.component.html',
  styleUrl: './today-status-main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayStatusMainComponent {
  today = new Date();
  private dateStatusService = inject(DateStatusService);
  dateStatus = toSignal(this.dateStatusService.getDateStatusString(this.today, 'ru'), { initialValue: 'Загрузка...' });
}
