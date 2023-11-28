import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectComponent } from './subject/subject.component';
import { CourseComponent } from './course/course.component';
import { GradeComponent } from './grade/grade.component';
import { ResultComponent } from './result/result.component';


const routes: Routes = [
  { path: 'Student', component: StudentComponent },
  { path: 'Teacher', component: TeacherComponent },
  { path: 'Subject', component: SubjectComponent },
  { path: 'Results', component: ResultComponent },
  { path: 'Course', component: CourseComponent },
  { path: 'Grade', component: GradeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
