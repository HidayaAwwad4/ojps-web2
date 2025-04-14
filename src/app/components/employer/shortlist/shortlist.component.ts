import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-shortlist',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './shortlist.component.html',
  standalone: true,
  styleUrl: './shortlist.component.css'
})
export class ShortlistComponent {
  shortlist = [
    { name: 'Mohammad Husain', email: 'Mohammad@gmail.com' },
    { name: 'Hidaya Awwad', email: 'Hidaya@gmail.com' },
    { name: 'Islam Sadaldeen', email: 'Islam@gmail.com' },
    { name: 'Razan abudaia', email: 'Razan@gmail.com' },
    { name: 'Tasneem jber', email: 'Tasneem@gmail.com' },
    { name: 'Haneen Akobeh', email: 'Haneen@gmail.com' },
  ];

}
