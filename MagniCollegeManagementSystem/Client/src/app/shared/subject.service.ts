import { Injectable } from '@angular/core';
import { Subject } from "./subject.model";
import { HttpClient } from '@angular/common/http';
import { Constants } from './Constants';
import { SplashScreenStateService } from './splash-screen-state.service';
import { Subject as SubjectObs } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient,
    private splashScreenStateService: SplashScreenStateService,) {
    this.refreshList();
    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 1);
  }

  subjectList: Subject[] = null;
  private listDataUpdatedSource = new SubjectObs<Subject[]>();
  private formDataUpdatedSource = new SubjectObs<Subject>();
  private resetFormDataUpdatedSource = new SubjectObs<number>();
  private closeModalUpdatedSource = new SubjectObs<boolean>();

  public sourceList$ = this.listDataUpdatedSource.asObservable();
  public formData$ = this.formDataUpdatedSource.asObservable();
  public resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
  public closeModal$ = this.closeModalUpdatedSource.asObservable();

  closeModal() {
    this.closeModalUpdatedSource.next(true);
  }

  notifyListUpdate() {
    this.listDataUpdatedSource.next(this.subjectList);
  }

  populateForm(formData: Subject) {
    this.formDataUpdatedSource.next(formData);
  }

  resetFormData(id: number) {
    this.resetFormDataUpdatedSource.next(id);
  }

  postSubject(formData: Subject) {
    return this.http.post(Constants.subjectsBase, formData);
  }

  putSubject(formData: Subject) {
    return this.http.put(Constants.subjectsBase + '/' + formData.Id, formData);
  }

  deleteSubject(id: number) {
    return this.http.delete(Constants.subjectsBase + '/' + id);
  }

  refreshList() {
    this.http.get(Constants.subjectsBase)
      .toPromise()
      .then(res => this.subjectList = res as Subject[])
      .then(res => this.notifyListUpdate());
  }
  getList() {
    return this.subjectList;
  }
}
