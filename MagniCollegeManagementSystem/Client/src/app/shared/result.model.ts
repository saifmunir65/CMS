import { Course } from "./course.model";
import { Grade } from "./grade.model";
import { Student } from "./student.model";
import { Subject } from "./subject.model";

export class Result {
    Id: number = 0;
    Course: Course = null;
    Student: Student = null;
    Subject: Subject = null;
    ObtainedMarks: number = 0;
    Grade: Grade = null;
}
