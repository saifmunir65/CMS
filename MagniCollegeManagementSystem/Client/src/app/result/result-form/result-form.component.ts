import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/shared/course.model';
import { CourseService } from 'src/app/shared/course.service';
import { Grade } from 'src/app/shared/grade.model';
import { GradeService } from 'src/app/shared/grade.service';
import { ResultService } from 'src/app/shared/result.service';
import { Student } from 'src/app/shared/student.model';
import { StudentService } from 'src/app/shared/student.service';
import { Subject } from 'src/app/shared/subject.model';
import { SubjectService } from 'src/app/shared/subject.service';
import { ToastrService } from 'ngx-toastr';
import { Result } from 'src/app/shared/result.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css']
})
export class ResultFormComponent implements OnInit, OnDestroy {

  private gradesInSelectedCourse: Grade[];

  public subjectsInSelectedCourse: Subject[];
  public studentsInSelectedSubject: Student[];
  public gradeLabelText: string = 'Enter obtained marks to calculate grade';
  public gradeLabelTextClass: string = "text-info";
  public formData: Result = new Result();
  public SubjectSelcetValidationMesage: string = '';
  public CourseSelcetValidationMesage: string = '';
  public StudentSelcetValidationMesage: string = '';
  private subscriptions: Subscription[] = [];

  @ViewChild('selectedSubject') selectedSubject;
  constructor
    (
      public service: ResultService,
      public studentService: StudentService,
      public subjectService: SubjectService,
      public gradeService: GradeService,
      public courseService: CourseService,
      private toaster: ToastrService
    ) {
    this.studentService.refreshList();
    this.subjectService.refreshList();
    this.gradeService.refreshList();
    this.courseService.refreshList();
  }

  ngOnInit(): void {
    this.subscriptions.push(

      this.service.formData$.subscribe(
        data => {
          this.formData = data;
        }
      ),

      this.service.resetFormData$.subscribe(
        data => {
          this.resetDataOnDelete(data);
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
      || this.formData.Student == null
      || this.formData.Subject == null
      || this.formData.Grade == null
      || this.isDuplicateRecord()
  }

  isDuplicateRecord() {
    return this.service.getList()?.filter(
      x => x.Course?.Id == this.formData.Course?.Id
        && x.Student?.Id == this.formData.Student?.Id
        && x.Subject?.Id == this.formData.Subject?.Id
        && this.formData.Id == 0).length > 0;
  }

  setValidationMessages() {
    this.SubjectSelcetValidationMesage = this.formData.Subject == null ? ": Required" : '';
    this.CourseSelcetValidationMesage = this.formData.Course == null ? ": Required" : '';
    this.StudentSelcetValidationMesage = this.formData.Student == null ? ": Required" : '';
    if (this.isDuplicateRecord()) {
      this.toaster.error("Result already exists. Use update option", "Error", { closeButton: true });
    }
  }

  populateForm(student: Result) {
    this.formData = Object.assign({}, student);
  }

  calculateGrade() {
    let obMarks = this.formData.ObtainedMarks;
    let course = this.formData.Course;

    if (course == null) {
      this.gradeLabelText = "Select a Course, and a subject first";
      this.gradeLabelTextClass = "text-danger";
      return;
    }

    let grades = this.gradeService.getList()?.filter(x => x.Course.Id == course.Id)
    if (grades == null) {
      this.gradeLabelText = "No grades available for the selected subject";
      this.gradeLabelTextClass = "text-info";
      return;
    }

    let grade = grades?.find(x => x.StartingMarks <= obMarks && x.EndingMarks >= obMarks);
    if (grade == null) {
      this.gradeLabelText = "No grade available for given marks range ";
      this.gradeLabelTextClass = "text-info";
      return;
    }
    this.formData.Grade = grade;
    this.gradeLabelText = grade?.Title;
  }

  onCourseSelect(course: Course) {
    this.formData.Course = course;
    this.subjectsInSelectedCourse = this.subjectService.subjectList?.filter(x => x.Course.Id == course.Id);
    this.gradesInSelectedCourse = this.gradeService.getList()?.filter(x => x.Course?.Id == course.Id);
    this.formData.Student = null;
    this.formData.Subject = null;
    this.selectedSubject.value = '';
    this.CourseSelcetValidationMesage = '';
  }

  onStudentSelect(student: Student) {
    this.formData.Student = student;
    this.StudentSelcetValidationMesage = '';
  }

  onSubjectSelect(subject: Subject) {
    this.formData.Subject = subject;
    this.studentsInSelectedSubject = this.studentService.studentsList.filter(x => x.Subjects.includes(subject.Id));
    this.SubjectSelcetValidationMesage = '';
  }

  inserRecord(form: NgForm) {
    this.service.postResult(this.formData).subscribe(
      result => {
        this.toaster.success('Result added successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while adding the new result', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putResult(this.formData).subscribe(
      result => {
        this.toaster.success('Result updated successfully', 'Success', { closeButton: true });
        this.service.closeModal();
        this.resetForm(form);
      }, error => {
        this.toaster.error('An error occured while updating the new result', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.resetFormData();

  }

  resetFormData() {
    this.gradeLabelText = 'Enter obtained marks to calculate grade';
    this.gradeLabelTextClass = "text-info";
    this.formData = new Result();
    this.SubjectSelcetValidationMesage = '';
    this.CourseSelcetValidationMesage = '';
    this.StudentSelcetValidationMesage = '';
  }

  resetDataOnDelete(id: number) {
    if (id == this.formData.Id || id == -1) {
      this.resetFormData();
    }
  }
}