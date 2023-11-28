import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../shared/Constants';
import { GradeService } from '../shared/grade.service';
import { ResultService } from '../shared/result.service';
import { Subject } from '../shared/subject.model';
import { SubjectService } from '../shared/subject.service'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit, OnDestroy {

  constructor(
    public service: SubjectService,
    public resultService: ResultService,
    public gradeService: GradeService,
    private ngZone: NgZone,
    private toaster: ToastrService) { }
  public subjectList: Subject[] = null;
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.service.refreshList();

    window[Constants.subjectComponentReference] =
    {
      component: this,
      zone: this.ngZone,
      syncData: () => this.service.refreshList()
    };

    this.subscriptions.push(

      this.service.sourceList$.subscribe(
        list => { this.subjectList = list; }
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

  updateSubject(record: Subject) {
    this.openModal(false);
    this.service.populateForm(record);
  }

  deleteSubject(record: Subject) {
    this.service.deleteSubject(record.Id).subscribe(
      result => {
        this.toaster.success('Subject deleted successfully', 'Success', { closeButton: true });
        this.service.refreshList();
      }, error => {
        this.toaster.error('An error occured, while deleting subject', 'Error', { closeButton: true });
        console.log(error);
      });
    this.service.resetFormData(record.Id);
  }

  isDeleteable(record: Subject) {
    return record.Students?.length <= 0 && record.Teacher == null;
  }

  getTooltipForDeleteButton(std: Subject) {
    return this.isDeleteable(std) ? "" : "Delete Students and Teacher associated to this Subject first";
  }

  getAverageGrade(subject: Subject) {
    let resultsForTheSubject = this.resultService?.getList()?.filter(x => x.Subject?.Id == subject.Id);

    if (resultsForTheSubject == null) {
      return 'Grades not assigned yet';
    }

    let sum = 0;
    resultsForTheSubject?.forEach(function (x) {
      sum += x.ObtainedMarks;
    });

    let average = sum / resultsForTheSubject.length;
    let grade = this.gradeService.getList()?.find
      (
        x => x.Course?.Id == subject.Course?.Id &&
          x.StartingMarks <= average &&
          x.EndingMarks >= average
      );

    if (grade == null) {
      return 'N/A';
    }
    return grade?.Title;
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