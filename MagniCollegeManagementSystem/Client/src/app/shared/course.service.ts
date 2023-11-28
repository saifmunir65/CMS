import { Injectable } from '@angular/core';
import { Course } from "./course.model";
import { HttpClient } from '@angular/common/http';
import { Constants } from '../shared/Constants';
import { SplashScreenStateService } from './splash-screen-state.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseList: Course[];

  constructor(private http: HttpClient,
    private splashScreenStateService: SplashScreenStateService) {
    this.refreshList();
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 1);
  }

  private listDataUpdatedSource = new Subject<Course[]>();
  private formDataUpdatedSource = new Subject<Course>();
  private resetFormDataUpdatedSource = new Subject<number>();
  private closeModalUpdatedSource = new Subject<boolean>();

  public sourceList$ = this.listDataUpdatedSource.asObservable();
  public formData$ = this.formDataUpdatedSource.asObservable();
  public resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
  public closeModal$ = this.closeModalUpdatedSource.asObservable();

  closeModal() {
    this.closeModalUpdatedSource.next(true);
  }

  notifyListUpdate() {
    this.listDataUpdatedSource.next(this.courseList);
  }

  populateForm(formData: Course) {
    this.formDataUpdatedSource.next(formData);
  }

  resetFormData(id: number) {
    this.resetFormDataUpdatedSource.next(id);
  }

  postCourse(formData: Course) {
    return this.http.post(Constants.coursesBase, formData);
  }

  putCourse(formData: Course) {
    return this.http.put(Constants.coursesBase + '/' + formData.Id, formData);
  }

  deleteCourse(id: number) {
    return this.http.delete(Constants.coursesBase + '/' + id);
  }

  refreshList() {
    this.http.get(Constants.coursesBase)
      .toPromise()
      .then(res => this.courseList = res as Course[])
      .then(res => this.notifyListUpdate());
  }

  getList() {
    return this.courseList;
  }
}
