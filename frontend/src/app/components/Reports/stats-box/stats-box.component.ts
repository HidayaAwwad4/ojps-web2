import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stats-box',
  imports: [],
  templateUrl: './stats-box.component.html',
  standalone: true,
  styleUrl: './stats-box.component.css'
})
export class StatsBoxComponent {
  @Input() value!: number;
  @Input() label!: string;
}
