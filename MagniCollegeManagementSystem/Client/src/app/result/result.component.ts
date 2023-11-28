import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../shared/Constants';
import { Result } from '../shared/result.model';
import { ResultService } from '../shared/result.service';
import { SubjectService } from '../shared/subject.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit, OnDestroy {
  resultsList: Result[];
  public readonly modalId: string = "resultModal";
  public readonly modalSelector: string = this.modalId;
  constructor(
    public service: ResultService,
    public subjectService: SubjectService,
    private ngZone: NgZone,
    private toaster: ToastrService) { }
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.service.refreshList();
    window[Constants.resultComponentReference] = { component: this, zone: this.ngZone, syncData: () => this.service.refreshList() };

    this.subscriptions.push(

      this.service.sourceList$.subscribe(
        list => { this.resultsList = list; }
      ),

      this.service.closeModal$.subscribe(
        data => {
          this.closeModal();
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  updateResult(record: Result) {
    this.openModal(false);
    this.service.populateForm(Object.assign({}, record));
  }

  deleteResult(record: Result) {
    this.service.deleteResult(record.Id).subscribe(
      result => {
        this.toaster.success('Result deleted successfully', 'Success', { closeButton: true });
      }, error => {
        this.toaster.error('An error occured, while deleting result', 'Error', { closeButton: true });
        console.log(error);
      });
    this.service.resetFormData(record.Id);
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

