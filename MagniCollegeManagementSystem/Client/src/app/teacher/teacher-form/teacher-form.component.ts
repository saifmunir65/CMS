import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Course } from 'src/app/shared/course.model';
import { CourseService } from 'src/app/shared/course.service';
import { TeacherService } from "../../shared/teacher.service";
import { ToastrService } from 'ngx-toastr';
import { Teacher } from 'src/app/shared/teacher.model';
import { Subject } from 'src/app/shared/subject.model';
import { SubjectService } from 'src/app/shared/subject.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css'],
})
export class TeacherFormComponent implements OnInit, OnDestroy {
  courses: Course[] = [];

  constructor(
    public service: TeacherService,
    public courseService: CourseService,
    public subjectService: SubjectService,
    private toaster: ToastrService) {
    this.subjectsDropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      noDataAvailablePlaceholderText: 'Select Course First',
      limitSelection: 6,
      itemsShowLimit: 6,
      allowSearchFilter: true
    };

    this.coursesDropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      limitSelection: 6,
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    courseService.refreshList();
    this.courses = courseService.getList();
  }

  subjectsDropdownSettings: IDropdownSettings = {};
  coursesDropdownSettings: IDropdownSettings = {};
  formData: Teacher = new Teacher();
  readonly genderOptions: string[] = ['Male', 'Female', 'Other'];
  selectedCourses: Course[] = [];
  selectedSubjects: Subject[] = [];
  subjectsForSelectedCourses: Subject[] = [];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.resetFormData();

    this.subscriptions.push(

      this.service.formData$.subscribe(
        formData => { this.populateForm(formData); }
      ),

      this.service.resetFormData$.subscribe(
        data => {
          this.resetFormDataListener(data);
        })

    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  onSubmit(form: NgForm) {
    if (this.isDuplicateRecord()) {
      this.toaster.error("Teacher already exists. Use update option", "Error", { closeButton: true });
    }
    else {
      this.formData.Subjects = this.selectedSubjects.map(x => x.Id);
      this.formData.Courses = this.selectedCourses.map(x => x.Id);
      if (this.formData.Id == 0) {
        this.inserRecord(form);
      }
      else {
        this.updateRecord(form);
      }
    }
  }

  isDuplicateRecord() {
    return this.service.getList()?.filter(
      x => x.Birthday == this.formData.Birthday
        && x.Name == this.formData.Name
        && x.Salary == this.formData.Salary
        && this.formData.Id == 0).length > 0;
  }

  inserRecord(form: NgForm) {
    this.service.postTeacher(this.formData).subscribe(
      result => {
        this.toaster.success('Teacher added successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while adding the new teacher', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putTeacher(this.formData).subscribe(
      result => {
        this.toaster.success('Teacher updated successfully', 'Success', { closeButton: true });
        this.resetForm(form);
        this.service.closeModal();
      }, error => {
        this.toaster.error('An error occured while updating the new teacher', 'Error', { closeButton: true });
        console.log(error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.resetFormData();
  }

  populateForm(record: Teacher) {
    this.formData = Object.assign({}, record);
    this.selectedSubjects = this.getSelctedSubjectListWithAllDetails();
    this.selectedCourses = this.getSelctedCourseListWithAllDetails();
    this.subjectsForSelectedCourses = this.getSubjectsForSelectedCourses(this.selectedCourses);
  }

  getSubjectsForSelectedCourses(courses: Course[]) {
    let list: Subject[] = [];
    var subjects = this.service.subjectService.getList();

    subjects?.filter(function (x) {
      if (courses?.filter(y => y.Id == x.Course?.Id).length > 0) {
        list.push(x);
      }
    });
    return list;
  }

  getSelctedSubjectListWithAllDetails() {
    let list: Subject[] = [];
    let form = this.formData;
    this.service.subjectService.getList()?.filter(function (x) {
      if (form?.Subjects?.includes(x.Id)) {
        list.push(x);
      }
    });
    return list;
  }

  getSelctedCourseListWithAllDetails() {
    let list: Course[] = [];
    let form = this.formData;
    this.courseService.getList()?.filter(function (x) {
      if (form?.Courses?.includes(x.Id)) {
        list.push(x);
      }
    });
    return list;
  }

  resetFormData() {
    this.formData = new Teacher();
    this.selectedSubjects = [];
    this.selectedCourses = [];
    this.subjectsForSelectedCourses = [];
  }

  onCourseSelect(item: Course) {
    var list = this.subjectService.getList()?.filter(x => x.Course?.Id == item.Id);
    this.subjectsForSelectedCourses = this.subjectsForSelectedCourses.concat(list);
  }

  onCourseDeselect(course: Course) {
    let subjectsInSelectedCourse = this.subjectService.getList()?.filter(x => x.Course?.Id == course.Id);
    this.selectedSubjects = this.selectedSubjects?.filter(function (x) {
      var shouldInclude = true;
      subjectsInSelectedCourse.forEach(element => {
        if (element.Id == x.Id) {
          shouldInclude = false;
        }
      });
      return shouldInclude;
    });

    this.subjectsForSelectedCourses = this.subjectsForSelectedCourses?.filter(function (x) {
      var shouldInclude = true;
      subjectsInSelectedCourse.forEach(element => {
        if (element.Id == x.Id) {
          shouldInclude = false;
        }
      });
      return shouldInclude;
    });
  }

  resetFormDataListener(id: number) {
    if (id == this.formData.Id || id == -1) {
      this.resetFormData();
    }
  }
}