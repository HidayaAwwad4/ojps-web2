import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AdminService } from '../../../services/admin/admin.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-employers',
  templateUrl: './manage-employers.component.html',
  styleUrls: ['./manage-employers.component.css'],
  standalone: true,
  imports: [NgForOf, FormsModule, NgClass],
})
export class ManageEmployersComponent implements OnInit {
  searchTerm: string = '';
  employers: any[] = [];
  selectedEmployer: any = null;
  actionType: 'approve' | 'remove' = 'remove';

  constructor(private location: Location, private adminService: AdminService) {}

  ngOnInit() {
    this.loadPendingEmployers();
  }

  loadPendingEmployers() {
    this.adminService.getPendingEmployers().subscribe({
      next: (data) => {
        this.employers = data.map((employer: any) => ({
          id: employer.id,
          name: employer.name,
          email: employer.email,
          status: 'pending',
        }));
      },
      error: (err) => {
        console.error('Error loading pending employers', err);
      }
    });
  }

  filteredEmployers() {
    return this.employers.filter(employer =>
      employer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openConfirmModal(employer: any, action: 'approve' | 'remove') {
    this.selectedEmployer = employer;
    this.actionType = action;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }

  confirmAction() {
    if (!this.selectedEmployer) return;

    if (this.actionType === 'remove') {
      this.adminService.rejectEmployer(this.selectedEmployer.id).subscribe({
        next: () => {
          this.employers = this.employers.filter(emp => emp !== this.selectedEmployer);
          this.selectedEmployer = null;
        },
        error: (err) => {
          console.error('Error rejecting employer', err);
        }
      });
    } else if (this.actionType === 'approve') {
      this.adminService.approveEmployer(this.selectedEmployer.id).subscribe({
        next: () => {
          const index = this.employers.findIndex(emp => emp === this.selectedEmployer);
          if (index !== -1) {
            this.employers[index] = {
              ...this.selectedEmployer,
              status: 'approved',
            };
          }
          this.selectedEmployer = null;
        },
        error: (err) => {
          console.error('Error approving employer', err);
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
