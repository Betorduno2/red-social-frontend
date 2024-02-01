// alert.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() alert: Alert | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((alert) => {
      this.alert = alert;
    });
  }

  close() {
    this.alertService.clear();
  }
}
