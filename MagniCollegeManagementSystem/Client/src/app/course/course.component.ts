import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../shared/Constants';
import { Course } from '../shared/course.model';
import { CourseService } from '../shared/course.service'
import { GradeService } from '../shared/grade.service';
import { ResultService } from '../shared/result.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, OnDestroy {
  constructor(
    public service: CourseService,
    private ngZone: NgZone,
    public resultService: ResultService,
    public gradeService: GradeService,
    private toastr: ToastrService) {

    gradeService.refreshList();
    resultService.refreshList();
  }

  public courseList: Course[];
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.service.refreshList();

    window[Constants.courseComponentReference] =
    {
      component: this,
      zone: this.ngZone,
      syncData: () => this.service.refreshList()
    };

    this.subscriptions.push(

      this.service.sourceList$.subscribe(
        list => { this.courseList = list; }
      ),

      this.service.closeModal$.subscribe(
        data => {
          this.closeModal();
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  populateForm(course: Course) {
    this.openModal(false);
    this.service.populateForm(Object.assign({}, course));
  }

  getAverageGrade(course: Course) {
    let resultsForTheCourse = this.resultService.getList()?.filter(x => x.Course.Id == course.Id);
    let sum = 0;
    if (resultsForTheCourse == null) {
      return 'Grades not assigned yet';
    }
    resultsForTheCourse?.forEach(function (x) {
      sum += x.ObtainedMarks;
    });

    let average = sum / resultsForTheCourse.length;
    let grade = this.gradeService.getList()?.find
      (
        x => x.Course.Id == course.Id &&
          x.StartingMarks <= average &&
          x.EndingMarks >= average
      );

    if (grade == null) {
      return 'N/A';
    }

    return grade?.Title;
  }

  deleteCourse(course: Course) {
    this.service.deleteCourse(course.Id).subscribe(
      result => {
        this.toastr.success('Course deleted successfully', 'Success', { closeButton: true });
      }, error => {
        this.toastr.error('An error occured, while deleting course', 'Error', { closeButton: true });
        console.log(error);
      });
    this.service.resetFormData(course.Id);
  }

  isDeleteable(course: Course) {
    var result = course.Students?.length <= 0
      && course.Teachers?.length <= 0
      && course.Subjects?.length <= 0;
    return result;
  }

  getTooltipForDeleteButton(course: Course) {
    return this.isDeleteable(course) ? "" : "Delete Students, Teachers and Subjects associated to this Course first";
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