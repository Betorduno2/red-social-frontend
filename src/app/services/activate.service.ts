import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {
  private activateSource = new Subject<boolean>();
  active$ = this.activateSource.asObservable();

  activate(active: boolean) {
    this.activateSource.next(active);
  }
}
