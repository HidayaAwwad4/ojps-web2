import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobDetailsModalService {
  private openDetailsSubject = new Subject<any>();
  openDetails$ = this.openDetailsSubject.asObservable();

  openJobDetails(job: any) {
    this.openDetailsSubject.next(job);
  }
}
