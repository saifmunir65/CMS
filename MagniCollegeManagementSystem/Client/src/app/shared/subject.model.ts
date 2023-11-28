import { Course } from "./course.model";
import { Teacher } from "./teacher.model";

export class Subject {
    Students: number[];
    Id:       number=0;
    Name:     string='';
    Code:     string='';
    Teacher:  Teacher=null;
    Course: Course = null;
    CreditHours: number=0;
}