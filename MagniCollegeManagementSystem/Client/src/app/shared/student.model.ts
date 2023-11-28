import { Course } from "./course.model";
import { Grade } from "./grade.model";

export class Student {
    Subjects: number[];
    Results: number[];
    Id: number = 0;
    RegisterationNumber: string = '';
    Name: string = '';
    Course: Course = null;
    Birthday: string = '';
}

