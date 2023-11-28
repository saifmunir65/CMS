import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from "../../shared/student.service";
import { Course } from 'src/app/shared/course.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/shared/subject.model';
import { Student } from 'src/app/shared/student.model';
import { SubjectService } from 'src/app/shared/subject.service';
import { CourseService } from 'src/app/shared/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  styles: [],
})
export class StudentFormComponent implements OnInit, OnDestroy {
  constructor(
    public service: StudentService,
    public courseService: CourseService,
    public subjectService: SubjectService,
    private toaster: ToastrService) {
    this.subjectsDropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      noDataAvailablePlaceholderText: 'Select a course first',
      limitSelection: 6,
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
  }

  subjectsDropdownSettings: IDropdownSettings = {};
  selectedCourse: Course;
  isFormValid: boolean = true;
  subjectsSelectionClass: string = 'text-success';
  courseSelectionClass: string = 'text-success';
  readonly courseDropDownDefaultValue = 'Select Course';
  readonly genderDropDownDefaultValue = 'Select Gender';
  readonly genderOptions: string[] = ['Male', 'Female', 'Other'];
  subjectsInselcetedCourse: Subject[];
  SubjectsSelcetValidationMesage: string = '';
  CourseSelcetValidationMesage: string = '';
  selectedSubjectsByStudent: Subject[];
  selectedCourseByStudent: string = this.courseDropDownDefaultValue;
  studentsList: Student[];
  formData: Student = new Student();
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.resetFormData();
    this.subscriptions.push(

      this.service.formData$.subscribe(
        data => {
          this.populateForm(data);
        }
      ),

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

  resetFormData() {
    this.formData = new Student();
    this.selectedCourseByStudent = this.courseDropDownDefaultValue;
    this.selectedSubjectsByStudent = null;
    this.subjectsInselcetedCourse = null;
    this.SubjectsSelcetValidationMesage = '';
  }

  onSelectCourse(course: Course) {
    if (course?.Id != this.formData?.Course?.Id) {
      this.selectedCourseByStudent = course.Name;
      this.formData.Course = course;
      this.subjectsInselcetedCourse = this.subjectService.getList().filter(x => x.Course?.Id == course?.Id);
      this.selectedSubjectsByStudent = [];
      this.SubjectsSelcetValidationMesage = ' ' + course.TotalCreditHours + ' Credit Hours Left';
      this.CourseSelcetValidationMesage = '';
    }
  }

  populateForm(student: Student) {
    this.formData = Object.assign({}, student);
    this.selectedCourseByStudent = student.Course?.Name;
    this.subjectsInselcetedCourse = this.subjectService.getList()?.filter(x => x.Course?.Id == student.Course?.Id);
    this.selectedSubjectsByStudent = this.getSelctedSubjectListWithAllDetails();
  }

  getSelctedSubjectListWithAllDetails() {
    let list: Subject[] = [];
    let form = this.formData;
    this.subjectsInselcetedCourse.filter(function (x) {
      if (form?.Subjects?.includes(x.Id)) {
        list.push(x);
      }
    });
    return list;
  }

  onSubmit(form: NgForm) {
    if (this.isCourseSelectionValid()) {
      this.courseSelectionClass = 'text-danger'
      this.CourseSelcetValidationMesage = ' :Required';
    }

    else if (this.isFormValid) {
      if (this.isDuplicateRecord()) {
        this.toaster.error("Student already exists. Use update option", "Error", { closeButton: true });
      }
      else {
        this.formData.Subjects = this.selectedSubjectsByStudent.map(a => a.Id);
        if (this.formData.Id == 0) {
          this.inserRecord(form);
        }
        else {
          this.updateRecord(form);
        }
      }
    }
  }

  isDuplicateRecord() {
    return this.service.getList()?.filter(
      x => x.Birthday == this.formData.Birthday
        && x.Name == this.formData.Name
        && this.formData.Id == 0).length > 0;
  }

  inserRecord(form: NgForm) {
    this.service.postStudent(this.formData).subscribe(
      result => {
        this.toaster.success('Student added successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while adding the new student', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putStudent(this.formData).subscribe(
      result => {
        this.toaster.success('Student updated successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while updating the new student', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.resetFormData();
  }

  onSubjectSelect(item: any) {
    this.validateSubjectSelection();
  }
  onSelectAllSubjects(items: any) {
    this.validateSubjectSelection();
  }
  onSubjectDeselect(item: any) {
    this.validateSubjectSelection();
  }

  validateSubjectSelection() {
    let allowed = this.formData.Course?.TotalCreditHours;
    let availed: number = 0;

    this.subjectsInselcetedCourse?.forEach(course => {
      if (this.selectedSubjectsByStudent?.find(x => x.Id == course.Id) != undefined) {
        availed += course.CreditHours;
      }
    });
    let difference = allowed - availed;

    if (availed < allowed) {
      this.subjectsSelectionClass = 'text-info'
      this.isFormValid = true;
      this.SubjectsSelcetValidationMesage = ': ' + difference + ' Credit hour(s) left';
    }
    else if (availed > allowed) {
      this.subjectsSelectionClass = 'text-danger'
      this.isFormValid = false;
      this.SubjectsSelcetValidationMesage = + (availed - allowed) + ' Extra credit hour(s), remove subject(s)';
    }
    else if (availed == allowed) {
      this.subjectsSelectionClass = 'text-info'
      this.SubjectsSelcetValidationMesage = ' : All credit hours availed'
      this.isFormValid = true;
    }
  }

  isCourseSelectionValid() {
    return this.selectedCourseByStudent == this.courseDropDownDefaultValue
  }

  resetFormDataOnDelete(id: number) {
    if (id == this.formData.Id || id == -1) {
      this.resetFormData();
    }
  }
}
