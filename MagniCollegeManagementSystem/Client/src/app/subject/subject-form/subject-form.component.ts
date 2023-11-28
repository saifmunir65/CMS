import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/shared/course.service';
import { SubjectService } from "../../shared/subject.service";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/shared/subject.model';
import { Course } from 'src/app/shared/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css'],
  styles: [
  ]
})
export class SubjectFormComponent implements OnInit, OnDestroy {

  constructor(
    public service: SubjectService,
    public courseService: CourseService,
    private toaster: ToastrService) { }

  formData: Subject = new Subject();
  courseDropDownCelectedValue: string = 'Select Course';
  CourseSelcetValidationMesage: string = ': Required';
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.resetFormData();

    this.subscriptions.push(

      this.service.formData$.subscribe(
        formData => { this.populateForm(formData); }
      ),

      this.service.resetFormData$.subscribe(
        data => {
          this.resetFormDataOnDelete(data);
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  selectCourse(course: Course) {
    this.courseDropDownCelectedValue = course.Name;
    this.formData.Course = course;
    this.CourseSelcetValidationMesage = '';
  }

  populateForm(subject: Subject) {
    this.courseDropDownCelectedValue = subject.Course?.Name;
    this.formData = Object.assign({}, subject);
  }

  onSubmit(form: NgForm) {
    if (this.isFormInvalid()) {
      this.setValidationMessages();
    }
    else {
      if (this.formData.Id == 0) {
        this.inserRecord(form);
      }
      else {
        this.updateRecord(form);
      }
    }
  }

  isFormInvalid() {
    return this.formData.Course == null
      || this.isDuplicateRecord();
  }

  isDuplicateRecord() {
    return this.service.getList()?.filter(
      x => x.Course?.Id == this.formData.Course?.Id
        && x.Code == this.formData.Code
        && x.CreditHours == this.formData.CreditHours
        && this.formData.Id == 0).length > 0;
  }

  setValidationMessages() {
    if (this.isDuplicateRecord()) {
      this.toaster.error("Subject already exists. Use update option", "Error", { closeButton: true });
    }
    else {
      this.CourseSelcetValidationMesage = ": Required"
    }
  }

  inserRecord(form: NgForm) {
    this.service.postSubject(this.formData).subscribe(
      result => {
        this.toaster.success('Subject added successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.refreshList();
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while adding the new subject', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putSubject(this.formData).subscribe(
      result => {
        this.toaster.success('Subject updated successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.refreshList();
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while updating the new subject', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.resetFormData();
  }

  resetFormData() {
    this.formData = new Subject();
    this.courseDropDownCelectedValue = 'Select Course';
    this.CourseSelcetValidationMesage = '';
  }

  resetFormDataOnDelete(id: number) {
    if (id == this.formData.Id || id == -1) {
      this.resetFormData();
    }
  }
}