// alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);

  getAlerts() {
    return this.alertSubject.asObservable();
  }

  success(message: string) {
    this.alertSubject.next({ type: 'success', message });
  }

  error(message: string) {
    this.alertSubject.next({ type: 'error', message });
  }

  clear() {
    this.alertSubject.next(null);
  }
}

export interface Alert {
  type: 'success' | 'error';
  message: string;
}
