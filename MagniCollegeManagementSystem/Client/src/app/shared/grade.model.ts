
import { Course } from "./course.model";

export class Grade {
    Id: number = 0;
    Title: string = '';
    StartingMarks: number = 0;
    EndingMarks: number = 0;
    Course: Course = null;
}