import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/shared/course.model';
import { CourseService } from 'src/app/shared/course.service';
import { Subject } from 'src/app/shared/subject.model';
import { GradeService } from "../../shared/grade.service";
import { ToastrService } from 'ngx-toastr';
import { Grade } from 'src/app/shared/grade.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css'],
  styles: [
  ]
})
export class GradeFormComponent implements OnInit, OnDestroy {

  constructor(
    public service: GradeService,
    public courseService: CourseService,
    private toaster: ToastrService,
  ) { }

  subjectsInSelectedCourse: Subject[];
  CourseSelcetValidationMesage: string = '';
  formData: Grade = new Grade();
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.resetFormData();
    this.service.formData$.subscribe(
      data => {
        this.formData = data;
      }
    );
    this.subscriptions.push(
      this.service.resetFormData$.subscribe(
        data => {
          this.resetFormDataOnDelete(data);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  onSubmit(form: NgForm) {
    if (this.isFormInvalid()) {
      this.setValidationMessages();
      return;
    }

    if (this.formData.Id == 0) {
      this.inserRecord(form);
      return;
    }

    this.updateRecord(form);
  }
  isFormInvalid() {
    return this.formData.Course == null
      || this.isDuplicateRecord();
  }

  isDuplicateRecord() {
    return this.service.getList()?.filter(
      x => x.Course?.Id == this.formData.Course?.Id
        && x.StartingMarks == this.formData.StartingMarks
        && x.EndingMarks == this.formData.EndingMarks
        && x.Title == this.formData.Title
        && this.formData.Id == 0).length > 0;
  }

  setValidationMessages() {

    if (this.isDuplicateRecord()) {
      this.toaster.error("Grade already exists. Use update option", "Error", { closeButton: true });
    }
    else {
      this.CourseSelcetValidationMesage = ": Required"
    }
  }


  onCourseSelect(course: Course) {
    this.formData.Course = course;
    this.CourseSelcetValidationMesage = "";
  }

  inserRecord(form: NgForm) {
    this.service.postGrade(this.formData).subscribe(
      result => {
        this.toaster.success('Grade added successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while adding the new grade', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putGrade(this.formData).subscribe(
      result => {
        this.toaster.success('Grade updated successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while updating the new grade', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.resetFormData();
  }

  resetFormData() {
    this.formData = new Grade();
    this.CourseSelcetValidationMesage = '';
  }

  resetFormDataOnDelete(id: number) {
    if (id == this.formData.Id || id == -1)
      this.resetFormData();
  }
}
