import { Course } from "./course.model";
import { Subject } from "./subject.model";
import { Teacher } from "./teacher.model";

export class TeacherForm {
    formData: Teacher;
    selectedSubjects: Subject[];
    subjectsForSelectedCourses: Subject[];
    selectedCourses: Course[];
}