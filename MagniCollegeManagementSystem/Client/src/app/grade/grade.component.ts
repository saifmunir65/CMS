import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../shared/Constants';
import { Grade } from '../shared/grade.model';
import { GradeService } from '../shared/grade.service'
import { ResultService } from '../shared/result.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
})
export class GradeComponent implements OnInit, OnDestroy {

  constructor(
    private service: GradeService,
    private resultService: ResultService,
    private ngZone: NgZone,
    private toastr: ToastrService) {
  }
  public gradesList: Grade[];
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.service.refreshList();

    window[Constants.gradeComponentReference] =
    {
      component: this,
      zone: this.ngZone,
      syncData: () => this.service.refreshList()
    };

    this.subscriptions.push(

      this.service.sourceList$.subscribe(
        list => { this.gradesList = list; }
      ),

      this.service.closeModal$.subscribe(
        data => {
          this.closeModal();
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  populateForm(grade: Grade) {
    this.openModal(false);
    this.service.sendFormData(Object.assign({}, grade));
  }

  deleteGrade(grade: Grade) {
    this.service.deleteGrade(grade.Id).subscribe(
      result => {
        this.toastr.success('Grade deleted successfully', 'Success', { closeButton: true });
      }, error => {
        this.toastr.error('An error occured, while deleting grade', 'Error', { closeButton: true });
        console.log(error);
      });
    this.service.resetFormData(grade.Id);
  }

  isDeleteable(grade: Grade) {
    return this.resultService.getList()?.filter(x => x.Grade?.Id == grade.Id)?.length <= 0;
  }

  getTooltipForDeleteButton(grade: Grade) {
    return this.isDeleteable(grade) ? "" : "Delete 'Results' associated to this 'Grade' first";
  }

  getgradesList() {
    console.log("Grades List Retunring");
    return this.gradesList;
  }

  openModal(clearForm: boolean) {
    if (clearForm)
      this.service.resetFormData(-1);

    document.getElementById("openModalButton").click();
  }

  closeModal() {
    document.getElementById("closeModalButton").click();
  }
}
