import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private drawerVisible = new BehaviorSubject<boolean>(false);
  drawerVisible$ = this.drawerVisible.asObservable();

  toggleDrawer() {
    this.drawerVisible.next(!this.drawerVisible.getValue());
  }
}
