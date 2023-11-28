import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Constants } from './Constants';
import { Result } from './result.model';
import { SplashScreenStateService } from './splash-screen-state.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  public resultsList: Result[]
  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private splashScreenStateService: SplashScreenStateService,) {
    this.refreshList();

    setTimeout(() => {
      this.splashScreenStateService.stop();
    }, 1);
  }

  private listDataUpdatedSource = new Subject<Result[]>();
  private formDataUpdatedSource = new Subject<Result>();
  private resetFormDataUpdatedSource = new Subject<number>();
  private closeModalUpdatedSource = new Subject<boolean>();

  sourceList$ = this.listDataUpdatedSource.asObservable();
  formData$ = this.formDataUpdatedSource.asObservable();
  resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
  closeModal$ = this.closeModalUpdatedSource.asObservable();

  notifyListUpdate() {
    this.listDataUpdatedSource.next(this.resultsList);
  }

  closeModal() {
    this.closeModalUpdatedSource.next(true);
  }

  populateForm(formData: Result) {
    this.formDataUpdatedSource.next(formData);
  }

  resetFormData(id: number) {
    this.resetFormDataUpdatedSource.next(id);
  }

  postResult(formData: Result) {
    return this.http.post(Constants.resultsBase, formData);
  }

  putResult(formData: Result) {
    return this.http.put(Constants.resultsBase + '/' + formData.Id, formData);
  }

  deleteResult(id: number) {
    return this.http.delete(Constants.resultsBase + '/' + id);
  }

  refreshList() {
    this.http.get(Constants.resultsBase)
      .toPromise()
      .then(res => this.resultsList = res as Result[])
      .then(res => this.notifyListUpdate());;
  }

  getList() {
    return this.resultsList;
  }
}
