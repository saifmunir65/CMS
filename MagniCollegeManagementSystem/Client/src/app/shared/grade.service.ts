import { Injectable } from '@angular/core';
import { Grade } from "./grade.model";
import { HttpClient } from '@angular/common/http';
import { Constants } from './Constants';
import { SplashScreenStateService } from './splash-screen-state.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient,
    private splashScreenStateService: SplashScreenStateService,) {
    this.refreshList();
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 1);
  }

  private gradesList: Grade[];
  private gradeDataUpdatedSource = new Subject<Grade[]>();
  private formDataUpdatedSource = new Subject<Grade>();
  private resetFormDataUpdatedSource = new Subject<number>();
  private closeModalUpdatedSource = new Subject<boolean>();

  public sourceList$ = this.gradeDataUpdatedSource.asObservable();
  public formData$ = this.formDataUpdatedSource.asObservable();
  public resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
  public closeModal$ = this.closeModalUpdatedSource.asObservable();

  closeModal() {
    this.closeModalUpdatedSource.next(true);
  }

  notifyListUpdate() {
    this.gradeDataUpdatedSource.next(this.gradesList);
  }

  sendFormData(formData: Grade) {
    this.formDataUpdatedSource.next(formData);
  }

  resetFormData(id: number) {
    this.resetFormDataUpdatedSource.next(id);
  }

  postGrade(formData: Grade) {
    return this.http.post(Constants.gradesBase, formData);
  }

  putGrade(formData: Grade) {
    return this.http.put(Constants.gradesBase + '/' + formData.Id, formData);
  }

  deleteGrade(id: number) {
    return this.http.delete(Constants.gradesBase + '/' + id);
  }

  refreshList() {
    this.http.get(Constants.gradesBase)
      .toPromise()
      .then(res => this.gradesList = res as Grade[])
      .then(x => this.notifyListUpdate());
  }

  getList() {
    return this.gradesList;
  }
}
