import { Component, NgZone, OnInit } from '@angular/core';
import { Constants } from '../shared/Constants';
import { CourseService } from '../shared/course.service';
import { SubjectService } from '../shared/subject.service';
import { Teacher } from '../shared/teacher.model';
import { TeacherService } from '../shared/teacher.service'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor
    (
      public subjectService: SubjectService,
      public service: TeacherService,
      public courseService: CourseService,
      private ngZone: NgZone,
      private toaster: ToastrService
    ) { }
  public teacherList: Teacher[];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.service.refreshList();

    window[Constants.teacherComponentReference] =
    {
      component: this,
      zone: this.ngZone,
      syncData: () => this.service.refreshList()
    };

    this.subscriptions.push(

      this.service.sourceList$.subscribe(
        list => { this.teacherList = list; }
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

  getSubjectName(subjectId: number) {
    return this.subjectService.getList()?.find(x => x.Id == subjectId)?.Name;
  }

  populateForm(record: Teacher) {
    this.service.populateForm(record);
    this.openModal(false);
  }

  deleteTeacher(record: Teacher) {
    this.service.deleteTeacher(record.Id).subscribe(
      result => {
        this.toaster.success('Teacher deleted successfully', 'Success', { closeButton: true });
      }, error => {
        this.toaster.error('An error occured, while deleting teacher', 'Error', { closeButton: true });
        console.log(error);
      });
    this.service.resetFormData(record.Id);
  }
  isDeleteable(record: Teacher) {
    return record.Subjects?.length <= 0;
  }

  getTooltipForDeleteButton(std: Teacher) {
    return this.isDeleteable(std) ? "" : "Delete Subjects associated to this Teacher first";
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
