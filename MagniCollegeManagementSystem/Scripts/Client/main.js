(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/jXb":
/*!****************************************************************!*\
  !*** ./src/app/teacher/teacher-form/teacher-form.component.ts ***!
  \****************************************************************/
/*! exports provided: TeacherFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherFormComponent", function() { return TeacherFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_teacher_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/teacher.model */ "kVKu");
/* harmony import */ var _shared_teacher_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/teacher.service */ "sz4S");
/* harmony import */ var src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/course.service */ "Pv0z");
/* harmony import */ var src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/subject.service */ "lLrn");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-multiselect-dropdown */ "Egam");









class TeacherFormComponent {
    constructor(service, courseService, subjectService, toaster) {
        this.service = service;
        this.courseService = courseService;
        this.subjectService = subjectService;
        this.toaster = toaster;
        this.courses = [];
        this.subjectsDropdownSettings = {};
        this.coursesDropdownSettings = {};
        this.formData = new src_app_shared_teacher_model__WEBPACK_IMPORTED_MODULE_1__["Teacher"]();
        this.genderOptions = ['Male', 'Female', 'Other'];
        this.selectedCourses = [];
        this.selectedSubjects = [];
        this.subjectsForSelectedCourses = [];
        this.subscriptions = [];
        this.subjectsDropdownSettings = {
            singleSelection: false,
            idField: 'Id',
            textField: 'Name',
            noDataAvailablePlaceholderText: 'Select Course First',
            limitSelection: 6,
            itemsShowLimit: 6,
            allowSearchFilter: true
        };
        this.coursesDropdownSettings = {
            singleSelection: false,
            idField: 'Id',
            textField: 'Name',
            limitSelection: 6,
            itemsShowLimit: 6,
            allowSearchFilter: true
        };
        courseService.refreshList();
        this.courses = courseService.getList();
    }
    ngOnInit() {
        this.resetFormData();
        this.subscriptions.push(this.service.formData$.subscribe(formData => { this.populateForm(formData); }), this.service.resetFormData$.subscribe(data => {
            this.resetFormDataListener(data);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    onSubmit(form) {
        if (this.isDuplicateRecord()) {
            this.toaster.error("Teacher already exists. Use update option", "Error", { closeButton: true });
        }
        else {
            this.formData.Subjects = this.selectedSubjects.map(x => x.Id);
            this.formData.Courses = this.selectedCourses.map(x => x.Id);
            if (this.formData.Id == 0) {
                this.inserRecord(form);
            }
            else {
                this.updateRecord(form);
            }
        }
    }
    isDuplicateRecord() {
        var _a;
        return ((_a = this.service.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => x.Birthday == this.formData.Birthday
            && x.Name == this.formData.Name
            && x.Salary == this.formData.Salary
            && this.formData.Id == 0).length) > 0;
    }
    inserRecord(form) {
        this.service.postTeacher(this.formData).subscribe(result => {
            this.toaster.success('Teacher added successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while adding the new teacher', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    updateRecord(form) {
        this.service.putTeacher(this.formData).subscribe(result => {
            this.toaster.success('Teacher updated successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while updating the new teacher', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    resetForm(form) {
        form.form.reset();
        this.resetFormData();
    }
    populateForm(record) {
        this.formData = Object.assign({}, record);
        this.selectedSubjects = this.getSelctedSubjectListWithAllDetails();
        this.selectedCourses = this.getSelctedCourseListWithAllDetails();
        this.subjectsForSelectedCourses = this.getSubjectsForSelectedCourses(this.selectedCourses);
    }
    getSubjectsForSelectedCourses(courses) {
        let list = [];
        var subjects = this.service.subjectService.getList();
        subjects === null || subjects === void 0 ? void 0 : subjects.filter(function (x) {
            if ((courses === null || courses === void 0 ? void 0 : courses.filter(y => { var _a; return y.Id == ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id); }).length) > 0) {
                list.push(x);
            }
        });
        return list;
    }
    getSelctedSubjectListWithAllDetails() {
        var _a;
        let list = [];
        let form = this.formData;
        (_a = this.service.subjectService.getList()) === null || _a === void 0 ? void 0 : _a.filter(function (x) {
            var _a;
            if ((_a = form === null || form === void 0 ? void 0 : form.Subjects) === null || _a === void 0 ? void 0 : _a.includes(x.Id)) {
                list.push(x);
            }
        });
        return list;
    }
    getSelctedCourseListWithAllDetails() {
        var _a;
        let list = [];
        let form = this.formData;
        (_a = this.courseService.getList()) === null || _a === void 0 ? void 0 : _a.filter(function (x) {
            var _a;
            if ((_a = form === null || form === void 0 ? void 0 : form.Courses) === null || _a === void 0 ? void 0 : _a.includes(x.Id)) {
                list.push(x);
            }
        });
        return list;
    }
    resetFormData() {
        this.formData = new src_app_shared_teacher_model__WEBPACK_IMPORTED_MODULE_1__["Teacher"]();
        this.selectedSubjects = [];
        this.selectedCourses = [];
        this.subjectsForSelectedCourses = [];
    }
    onCourseSelect(item) {
        var _a;
        var list = (_a = this.subjectService.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => { var _a; return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == item.Id; });
        this.subjectsForSelectedCourses = this.subjectsForSelectedCourses.concat(list);
    }
    onCourseDeselect(course) {
        var _a, _b, _c;
        let subjectsInSelectedCourse = (_a = this.subjectService.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => { var _a; return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == course.Id; });
        this.selectedSubjects = (_b = this.selectedSubjects) === null || _b === void 0 ? void 0 : _b.filter(function (x) {
            var shouldInclude = true;
            subjectsInSelectedCourse.forEach(element => {
                if (element.Id == x.Id) {
                    shouldInclude = false;
                }
            });
            return shouldInclude;
        });
        this.subjectsForSelectedCourses = (_c = this.subjectsForSelectedCourses) === null || _c === void 0 ? void 0 : _c.filter(function (x) {
            var shouldInclude = true;
            subjectsInSelectedCourse.forEach(element => {
                if (element.Id == x.Id) {
                    shouldInclude = false;
                }
            });
            return shouldInclude;
        });
    }
    resetFormDataListener(id) {
        if (id == this.formData.Id || id == -1) {
            this.resetFormData();
        }
    }
}
TeacherFormComponent.ɵfac = function TeacherFormComponent_Factory(t) { return new (t || TeacherFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_teacher_service__WEBPACK_IMPORTED_MODULE_2__["TeacherService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"])); };
TeacherFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TeacherFormComponent, selectors: [["app-teacher-form"]], decls: 43, vars: 13, consts: [[1, "row"], ["ngNativeValidate", "", 3, "submit"], ["form", "ngForm"], [1, "col-lg-12"], ["type", "hidden", "name", "id", 3, "value"], [1, "form-group"], [1, "label", "label-default"], [1, "lbl-required"], ["placeholder", " Name", "name", "name", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["Name", "ngModel"], ["type", "date", "placeholder", "Pick Date Of Birth", "name", "dob", "max", "2005-12-31", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["dob", "ngModel"], ["placeholder", "Salary", "name", "salary", "type", "number", "min", "0", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["salary", "ngModel"], ["name", "coursesSelect", 3, "placeholder", "settings", "data", "ngModel", "ngModelChange", "onSelect", "onDeSelect"], ["name", "subjectSelect", 3, "placeholder", "settings", "data", "ngModel", "ngModelChange"], [1, "form-group", "col-md-6"], ["type", "button", 1, "btn", "btn-info", "btn-lg", "btn-block", 3, "click"], ["type", "submit", 1, "btn", "btn-info", "btn-lg", "btn-block"]], template: function TeacherFormComponent_Template(rf, ctx) { if (rf & 1) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function TeacherFormComponent_Template_form_submit_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.onSubmit(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TeacherFormComponent_Template_input_ngModelChange_10_listener($event) { return ctx.formData.Name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Birthday");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "input", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TeacherFormComponent_Template_input_ngModelChange_17_listener($event) { return ctx.formData.Birthday = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Salary $");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "input", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TeacherFormComponent_Template_input_ngModelChange_24_listener($event) { return ctx.formData.Salary = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Courses");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "ng-multiselect-dropdown", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TeacherFormComponent_Template_ng_multiselect_dropdown_ngModelChange_30_listener($event) { return ctx.selectedCourses = $event; })("onSelect", function TeacherFormComponent_Template_ng_multiselect_dropdown_onSelect_30_listener($event) { return ctx.onCourseSelect($event); })("onDeSelect", function TeacherFormComponent_Template_ng_multiselect_dropdown_onDeSelect_30_listener($event) { return ctx.onCourseDeselect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Subjects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "ng-multiselect-dropdown", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TeacherFormComponent_Template_ng_multiselect_dropdown_ngModelChange_35_listener($event) { return ctx.selectedSubjects = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TeacherFormComponent_Template_button_click_38_listener() { return ctx.resetFormData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.formData.Id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Birthday);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Salary);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Select Course(s)")("settings", ctx.coursesDropdownSettings)("data", ctx.courses)("ngModel", ctx.selectedCourses);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Select Subject(s)")("settings", ctx.subjectsDropdownSettings)("data", ctx.subjectsForSelectedCourses)("ngModel", ctx.selectedSubjects);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.formData.Id != 0 ? "Update" : "Add", " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NumberValueAccessor"], ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_7__["MultiSelectComponent"]], styles: [".lbl-required[_ngcontent-%COMP%] {\n    color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYWNoZXItZm9ybS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksVUFBVTtBQUNkIiwiZmlsZSI6InRlYWNoZXItZm9ybS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxibC1yZXF1aXJlZCB7XG4gICAgY29sb3I6IHJlZDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TeacherFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-teacher-form',
                templateUrl: './teacher-form.component.html',
                styleUrls: ['./teacher-form.component.css'],
            }]
    }], function () { return [{ type: _shared_teacher_service__WEBPACK_IMPORTED_MODULE_2__["TeacherService"] }, { type: src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"] }, { type: src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "/naD":
/*!***************************************!*\
  !*** ./src/app/shared/grade.model.ts ***!
  \***************************************/
/*! exports provided: Grade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grade", function() { return Grade; });
class Grade {
    constructor() {
        this.Id = 0;
        this.Title = '';
        this.StartingMarks = 0;
        this.EndingMarks = 0;
        this.Course = null;
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Personal\Projects\Angular\Magni CMS\MagniCMS\MagniCollegeManagementSystem\Client\src\main.ts */"zUnb");


/***/ }),

/***/ "0EBP":
/*!**********************************************!*\
  !*** ./src/app/subject/subject.component.ts ***!
  \**********************************************/
/*! exports provided: SubjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectComponent", function() { return SubjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/Constants */ "z9QB");
/* harmony import */ var _shared_subject_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/subject.service */ "lLrn");
/* harmony import */ var _shared_result_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/result.service */ "CLH5");
/* harmony import */ var _shared_grade_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/grade.service */ "uab5");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _subject_form_subject_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./subject-form/subject-form.component */ "mugH");









function SubjectComponent_tr_31_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SubjectComponent_tr_31_Template_td_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const subj_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.updateSubject(subj_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SubjectComponent_tr_31_Template_td_click_20_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const subj_r1 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.deleteSubject(subj_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const subj_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](subj_r1.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](subj_r1.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](subj_r1.Code);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](subj_r1.Course == null ? null : subj_r1.Course.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](subj_r1.CreditHours);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((subj_r1.Teacher == null ? null : subj_r1.Teacher.Name) ? subj_r1.Teacher == null ? null : subj_r1.Teacher.Name : "N/A");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](subj_r1.Students == null ? null : subj_r1.Students.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.getAverageGrade(subj_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", ctx_r0.getTooltipForDeleteButton(subj_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r0.isDeleteable(subj_r1));
} }
class SubjectComponent {
    constructor(service, resultService, gradeService, ngZone, toaster) {
        this.service = service;
        this.resultService = resultService;
        this.gradeService = gradeService;
        this.ngZone = ngZone;
        this.toaster = toaster;
        this.subjectList = null;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.service.refreshList();
        window[_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].subjectComponentReference] =
            {
                component: this,
                zone: this.ngZone,
                syncData: () => this.service.refreshList()
            };
        this.subscriptions.push(this.service.sourceList$.subscribe(list => { this.subjectList = list; }), this.service.closeModal$.subscribe(data => {
            this.closeModal();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    updateSubject(record) {
        this.openModal(false);
        this.service.populateForm(record);
    }
    deleteSubject(record) {
        this.service.deleteSubject(record.Id).subscribe(result => {
            this.toaster.success('Subject deleted successfully', 'Success', { closeButton: true });
            this.service.refreshList();
        }, error => {
            this.toaster.error('An error occured, while deleting subject', 'Error', { closeButton: true });
            console.log(error);
        });
        this.service.resetFormData(record.Id);
    }
    isDeleteable(record) {
        var _a;
        return ((_a = record.Students) === null || _a === void 0 ? void 0 : _a.length) <= 0 && record.Teacher == null;
    }
    getTooltipForDeleteButton(std) {
        return this.isDeleteable(std) ? "" : "Delete Students and Teacher associated to this Subject first";
    }
    getAverageGrade(subject) {
        var _a, _b, _c;
        let resultsForTheSubject = (_b = (_a = this.resultService) === null || _a === void 0 ? void 0 : _a.getList()) === null || _b === void 0 ? void 0 : _b.filter(x => { var _a; return ((_a = x.Subject) === null || _a === void 0 ? void 0 : _a.Id) == subject.Id; });
        if (resultsForTheSubject == null) {
            return 'Grades not assigned yet';
        }
        let sum = 0;
        resultsForTheSubject === null || resultsForTheSubject === void 0 ? void 0 : resultsForTheSubject.forEach(function (x) {
            sum += x.ObtainedMarks;
        });
        let average = sum / resultsForTheSubject.length;
        let grade = (_c = this.gradeService.getList()) === null || _c === void 0 ? void 0 : _c.find(x => {
            var _a, _b;
            return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == ((_b = subject.Course) === null || _b === void 0 ? void 0 : _b.Id) &&
                x.StartingMarks <= average &&
                x.EndingMarks >= average;
        });
        if (grade == null) {
            return 'N/A';
        }
        return grade === null || grade === void 0 ? void 0 : grade.Title;
    }
    openModal(clearForm) {
        if (clearForm)
            this.service.resetFormData(-1);
        document.getElementById("openModalButton").click();
    }
    closeModal() {
        document.getElementById("closeModalButton").click();
    }
}
SubjectComponent.ɵfac = function SubjectComponent_Factory(t) { return new (t || SubjectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_subject_service__WEBPACK_IMPORTED_MODULE_2__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_grade_service__WEBPACK_IMPORTED_MODULE_4__["GradeService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"])); };
SubjectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SubjectComponent, selectors: [["app-subject"]], decls: 49, vars: 2, consts: [[1, "jumbotron", "py-3"], [1, "display-4", "text-center"], [1, "body-content"], [1, "row"], [1, "col-md-12"], [1, "table-wrapper"], [1, "table"], [1, "thead-light"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-lg", "btn-info", 3, "click"], ["id", "openModalButton", "data-toggle", "modal", "data-target", "#subjectModal", 3, "hidden"], ["id", "subjectModal", "tabindex", "-1", "role", "dialog", "aria-labelledby", "subjectModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "subjectModalLabel", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "id", "closeModalButton", "data-target", "#subjectModal", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [3, "click"], ["type", "button", 1, "btn", "btn-info"], ["type", "button", "data-toggle", "tooltip", 1, "btn", "btn-danger", 3, "disabled", "title"]], template: function SubjectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Subjects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "thead", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Id ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Subject Name ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Code ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Course ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Credit Hours ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Teacher ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Students Enrolled ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Average Grade ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, SubjectComponent_tr_31_Template, 23, 10, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SubjectComponent_Template_button_click_34_listener() { return ctx.openModal(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " Add New Subject ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Open Modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Add/Update Subject");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "app-subject-form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.subjectList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _subject_form_subject_form_component__WEBPACK_IMPORTED_MODULE_7__["SubjectFormComponent"]], styles: [".table-wrapper[_ngcontent-%COMP%] {\n    max-height: 400px;\n    overflow: auto;\n    max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YmplY3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsZUFBZTtBQUNuQiIsImZpbGUiOiJzdWJqZWN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFibGUtd3JhcHBlciB7XG4gICAgbWF4LWhlaWdodDogNDAwcHg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SubjectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-subject',
                templateUrl: './subject.component.html',
                styleUrls: ['./subject.component.css'],
            }]
    }], function () { return [{ type: _shared_subject_service__WEBPACK_IMPORTED_MODULE_2__["SubjectService"] }, { type: _shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"] }, { type: _shared_grade_service__WEBPACK_IMPORTED_MODULE_4__["GradeService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "0pn7":
/*!**********************************************************!*\
  !*** ./src/app/grade/grade-form/grade-form.component.ts ***!
  \**********************************************************/
/*! exports provided: GradeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeFormComponent", function() { return GradeFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_grade_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/grade.model */ "/naD");
/* harmony import */ var _shared_grade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/grade.service */ "uab5");
/* harmony import */ var src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/course.service */ "Pv0z");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function GradeFormComponent_button_24_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GradeFormComponent_button_24_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const course_r6 = ctx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.onCourseSelect(course_r6); })("click", function GradeFormComponent_button_24_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const course_r6 = ctx.$implicit; _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](23); return _r2.value = course_r6.Name; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const course_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", course_r6.Name, " ");
} }
class GradeFormComponent {
    constructor(service, courseService, toaster) {
        this.service = service;
        this.courseService = courseService;
        this.toaster = toaster;
        this.CourseSelcetValidationMesage = '';
        this.formData = new src_app_shared_grade_model__WEBPACK_IMPORTED_MODULE_1__["Grade"]();
        this.subscriptions = [];
    }
    ngOnInit() {
        this.resetFormData();
        this.service.formData$.subscribe(data => {
            this.formData = data;
        });
        this.subscriptions.push(this.service.resetFormData$.subscribe(data => {
            this.resetFormDataOnDelete(data);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    onSubmit(form) {
        if (this.isFormInvalid()) {
            this.setValidationMessages();
            return;
        }
        if (this.formData.Id == 0) {
            this.inserRecord(form);
            return;
        }
        this.updateRecord(form);
    }
    isFormInvalid() {
        return this.formData.Course == null
            || this.isDuplicateRecord();
    }
    isDuplicateRecord() {
        var _a;
        return ((_a = this.service.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => {
            var _a, _b;
            return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == ((_b = this.formData.Course) === null || _b === void 0 ? void 0 : _b.Id)
                && x.StartingMarks == this.formData.StartingMarks
                && x.EndingMarks == this.formData.EndingMarks
                && x.Title == this.formData.Title
                && this.formData.Id == 0;
        }).length) > 0;
    }
    setValidationMessages() {
        if (this.isDuplicateRecord()) {
            this.toaster.error("Grade already exists. Use update option", "Error", { closeButton: true });
        }
        else {
            this.CourseSelcetValidationMesage = ": Required";
        }
    }
    onCourseSelect(course) {
        this.formData.Course = course;
        this.CourseSelcetValidationMesage = "";
    }
    inserRecord(form) {
        this.service.postGrade(this.formData).subscribe(result => {
            this.toaster.success('Grade added successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while adding the new grade', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    updateRecord(form) {
        this.service.putGrade(this.formData).subscribe(result => {
            this.toaster.success('Grade updated successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while updating the new grade', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    resetForm(form) {
        form.form.reset();
        this.resetFormData();
    }
    resetFormData() {
        this.formData = new src_app_shared_grade_model__WEBPACK_IMPORTED_MODULE_1__["Grade"]();
        this.CourseSelcetValidationMesage = '';
    }
    resetFormDataOnDelete(id) {
        if (id == this.formData.Id || id == -1)
            this.resetFormData();
    }
}
GradeFormComponent.ɵfac = function GradeFormComponent_Factory(t) { return new (t || GradeFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_grade_service__WEBPACK_IMPORTED_MODULE_2__["GradeService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"])); };
GradeFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GradeFormComponent, selectors: [["app-grade-form"]], decls: 46, vars: 8, consts: [[1, "row"], ["ngNativeValidate", "", 3, "submit"], ["form", "ngForm"], [1, "col", "col-lg-12"], ["type", "hidden", "name", "id", 3, "value"], [1, "label", "label-default"], [1, "lbl-required"], [1, "form-group"], ["placeholder", "Grade Title", "name", "title", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["Title", "ngModel"], [1, "label", "label-default", "text-danger"], [1, "dropdown"], ["id", "dropdownMenuButton", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", 1, "btn", "btn-secondary", "dropdown-toggle", "drp-dwn"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu"], ["selectedCourse", ""], ["type", "button", "class", "dropdown-item", 3, "click", 4, "ngFor", "ngForOf"], ["type", "number", "required", "", "min", "0", "max", "100", "placeholder", "Starting Marks", "name", "startingMarks", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["StartingMarks", "ngModel"], ["type", "number", "required", "", "min", "0", "max", "100", "placeholder", "EndingMarks", "name", "endingMarks", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["EndingMarks", "ngModel"], [1, "form-group", "col-md-6"], ["type", "button", 1, "btn", "btn-info", "btn-lg", "btn-block", 3, "click"], ["type", "submit", 1, "btn", "btn-info", "btn-lg", "btn-block"], ["type", "button", 1, "dropdown-item", 3, "click"]], template: function GradeFormComponent_Template(rf, ctx) { if (rf & 1) {
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function GradeFormComponent_Template_form_submit_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.onSubmit(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GradeFormComponent_Template_input_ngModelChange_10_listener($event) { return ctx.formData.Title = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, GradeFormComponent_button_24_Template, 2, 1, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Starting Marks");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "input", 16, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GradeFormComponent_Template_input_ngModelChange_30_listener($event) { return ctx.formData.StartingMarks = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Ending Marks");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "input", 18, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GradeFormComponent_Template_input_ngModelChange_37_listener($event) { return ctx.formData.EndingMarks = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GradeFormComponent_Template_button_click_41_listener() { return ctx.resetFormData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.formData.Id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.CourseSelcetValidationMesage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.formData == null ? null : ctx.formData.Course == null ? null : ctx.formData.Course.Name) ? ctx.formData == null ? null : ctx.formData.Course == null ? null : ctx.formData.Course.Name : "Select Course", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.courseService.getList());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.StartingMarks);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.EndingMarks);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.formData.Id != 0 ? "Update" : "Add", " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NumberValueAccessor"]], styles: [".drp-dwn[_ngcontent-%COMP%] {\n    width: 280px;\n    max-width: 100%;\n    height: 48px;\n    max-height: 100%;\n}\n.lbl-required[_ngcontent-%COMP%] {\n    color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYWRlLWZvcm0uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixlQUFlO0lBQ2YsWUFBWTtJQUNaLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksVUFBVTtBQUNkIiwiZmlsZSI6ImdyYWRlLWZvcm0uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kcnAtZHduIHtcbiAgICB3aWR0aDogMjgwcHg7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDhweDtcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xufVxuLmxibC1yZXF1aXJlZCB7XG4gICAgY29sb3I6IHJlZDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GradeFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-grade-form',
                templateUrl: './grade-form.component.html',
                styleUrls: ['./grade-form.component.css'],
                styles: []
            }]
    }], function () { return [{ type: _shared_grade_service__WEBPACK_IMPORTED_MODULE_2__["GradeService"] }, { type: src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "C8wY":
/*!*******************************************************!*\
  !*** ./src/app/shared/splash-screen-state.service.ts ***!
  \*******************************************************/
/*! exports provided: SplashScreenStateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashScreenStateService", function() { return SplashScreenStateService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");



class SplashScreenStateService {
    constructor() {
        this.isStopped = false;
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    subscribe(onNext) {
        return this.subject.subscribe(onNext);
    }
    stop() {
        if (!this.isStopped) {
            this.subject.next(false);
            this.isStopped = true;
        }
    }
}
SplashScreenStateService.ɵfac = function SplashScreenStateService_Factory(t) { return new (t || SplashScreenStateService)(); };
SplashScreenStateService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SplashScreenStateService, factory: SplashScreenStateService.ɵfac });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SplashScreenStateService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], null, null); })();


/***/ }),

/***/ "CLH5":
/*!******************************************!*\
  !*** ./src/app/shared/result.service.ts ***!
  \******************************************/
/*! exports provided: ResultService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultService", function() { return ResultService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "z9QB");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./splash-screen-state.service */ "C8wY");







class ResultService {
    constructor(http, toaster, splashScreenStateService) {
        this.http = http;
        this.toaster = toaster;
        this.splashScreenStateService = splashScreenStateService;
        this.listDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.formDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.resetFormDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.closeModalUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.sourceList$ = this.listDataUpdatedSource.asObservable();
        this.formData$ = this.formDataUpdatedSource.asObservable();
        this.resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
        this.closeModal$ = this.closeModalUpdatedSource.asObservable();
        this.refreshList();
        setTimeout(() => {
            this.splashScreenStateService.stop();
        }, 1);
    }
    notifyListUpdate() {
        this.listDataUpdatedSource.next(this.resultsList);
    }
    closeModal() {
        this.closeModalUpdatedSource.next(true);
    }
    populateForm(formData) {
        this.formDataUpdatedSource.next(formData);
    }
    resetFormData(id) {
        this.resetFormDataUpdatedSource.next(id);
    }
    postResult(formData) {
        return this.http.post(_Constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].resultsBase, formData);
    }
    putResult(formData) {
        return this.http.put(_Constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].resultsBase + '/' + formData.Id, formData);
    }
    deleteResult(id) {
        return this.http.delete(_Constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].resultsBase + '/' + id);
    }
    refreshList() {
        this.http.get(_Constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].resultsBase)
            .toPromise()
            .then(res => this.resultsList = res)
            .then(res => this.notifyListUpdate());
        ;
    }
    getList() {
        return this.resultsList;
    }
}
ResultService.ɵfac = function ResultService_Factory(t) { return new (t || ResultService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_5__["SplashScreenStateService"])); };
ResultService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ResultService, factory: ResultService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ResultService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }, { type: _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_5__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "LLLq":
/*!*************************************************************!*\
  !*** ./src/app/course/course-form/course-form.component.ts ***!
  \*************************************************************/
/*! exports provided: CourseFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseFormComponent", function() { return CourseFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_course_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/course.model */ "vQy0");
/* harmony import */ var _shared_course_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/course.service */ "Pv0z");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");






class CourseFormComponent {
    constructor(service, toastr) {
        this.service = service;
        this.toastr = toastr;
        this.formData = new src_app_shared_course_model__WEBPACK_IMPORTED_MODULE_1__["Course"]();
        this.subscriptions = [];
    }
    ngOnInit() {
        this.resetFormData();
        this.subscriptions.push(this.service.formData$.subscribe(data => {
            this.formData = data;
        }), this.service.resetFormData$.subscribe(id => {
            this.resetFormDataOnDelete(id);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    onSubmit(form) {
        if (this.isDuplicateRecord()) {
            this.toastr
                .error("Course already exists. Use update option", "Error", { closeButton: true });
        }
        else if (this.formData.Id == 0) {
            this.insertCourse(form);
        }
        else {
            this.updateCourse(form);
        }
    }
    isDuplicateRecord() {
        var _a;
        return ((_a = this.service.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => x.Code == this.formData.Code
            && x.Name == this.formData.Name
            && x.TotalCreditHours == this.formData.TotalCreditHours
            && this.formData.Id == 0).length) > 0;
    }
    insertCourse(form) {
        this.service.postCourse(this.formData).subscribe(result => {
            this.toastr.success('Course added successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toastr.error('An error occured while adding the new course', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    updateCourse(form) {
        this.service.putCourse(this.formData).subscribe(result => {
            this.toastr.success('Course updated successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toastr.error('An error occured while updating the new course', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    resetForm(form) {
        form.form.reset();
        this.resetFormData();
    }
    resetFormData() {
        this.formData = new src_app_shared_course_model__WEBPACK_IMPORTED_MODULE_1__["Course"]();
    }
    resetFormDataOnDelete(id) {
        if (id == this.formData.Id || id == -1) {
            this.resetFormData();
        }
    }
}
CourseFormComponent.ɵfac = function CourseFormComponent_Factory(t) { return new (t || CourseFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_course_service__WEBPACK_IMPORTED_MODULE_2__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"])); };
CourseFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CourseFormComponent, selectors: [["app-course-form"]], decls: 33, vars: 5, consts: [[1, "row"], ["ngNativeValidate", "", 3, "submit"], ["form", "ngForm"], [1, "col", "col-lg-12"], ["type", "hidden", "name", "id", 3, "value"], [1, "label", "label-default"], [1, "lbl-required"], [1, "form-group"], ["placeholder", "Course Name", "name", "Name", "required", "", "maxlength", "100", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["CourseCode", "ngModel"], ["placeholder", "Course Code", "name", "code", "required", "", "maxlength", "100", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "3", "placeholder", "Total Credit Hours", "name", "name", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["SubjectsCount", "ngModel"], [1, "form-group", "col-md-6"], ["type", "button", 1, "btn", "btn-info", "btn-lg", "btn-block", 3, "click"], ["type", "submit", 1, "btn", "btn-info", "btn-lg", "btn-block"]], template: function CourseFormComponent_Template(rf, ctx) { if (rf & 1) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function CourseFormComponent_Template_form_submit_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.onSubmit(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CourseFormComponent_Template_input_ngModelChange_10_listener($event) { return ctx.formData.Name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "input", 10, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CourseFormComponent_Template_input_ngModelChange_17_listener($event) { return ctx.formData.Code = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Total Credit Hours");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "input", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function CourseFormComponent_Template_input_ngModelChange_24_listener($event) { return ctx.formData.TotalCreditHours = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseFormComponent_Template_button_click_28_listener() { return ctx.resetFormData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.formData.Id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Code);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.TotalCreditHours);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.formData.Id != 0 ? "Update" : "Add", " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NumberValueAccessor"]], styles: [".lbl-required[_ngcontent-%COMP%] {\n    color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS1mb3JtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0FBQ2QiLCJmaWxlIjoiY291cnNlLWZvcm0uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sYmwtcmVxdWlyZWQge1xuICAgIGNvbG9yOiByZWQ7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CourseFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-course-form',
                templateUrl: './course-form.component.html',
                styleUrls: ['./course-form.component.css'],
            }]
    }], function () { return [{ type: _shared_course_service__WEBPACK_IMPORTED_MODULE_2__["CourseService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "Pv0z":
/*!******************************************!*\
  !*** ./src/app/shared/course.service.ts ***!
  \******************************************/
/*! exports provided: CourseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseService", function() { return CourseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/Constants */ "z9QB");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./splash-screen-state.service */ "C8wY");






class CourseService {
    constructor(http, splashScreenStateService) {
        this.http = http;
        this.splashScreenStateService = splashScreenStateService;
        this.listDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.formDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetFormDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.closeModalUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.sourceList$ = this.listDataUpdatedSource.asObservable();
        this.formData$ = this.formDataUpdatedSource.asObservable();
        this.resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
        this.closeModal$ = this.closeModalUpdatedSource.asObservable();
        this.refreshList();
        setTimeout(() => {
            this.splashScreenStateService.stop();
        }, 1);
    }
    closeModal() {
        this.closeModalUpdatedSource.next(true);
    }
    notifyListUpdate() {
        this.listDataUpdatedSource.next(this.courseList);
    }
    populateForm(formData) {
        this.formDataUpdatedSource.next(formData);
    }
    resetFormData(id) {
        this.resetFormDataUpdatedSource.next(id);
    }
    postCourse(formData) {
        return this.http.post(_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].coursesBase, formData);
    }
    putCourse(formData) {
        return this.http.put(_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].coursesBase + '/' + formData.Id, formData);
    }
    deleteCourse(id) {
        return this.http.delete(_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].coursesBase + '/' + id);
    }
    refreshList() {
        this.http.get(_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].coursesBase)
            .toPromise()
            .then(res => this.courseList = res)
            .then(res => this.notifyListUpdate());
    }
    getList() {
        return this.courseList;
    }
}
CourseService.ɵfac = function CourseService_Factory(t) { return new (t || CourseService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__["SplashScreenStateService"])); };
CourseService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CourseService, factory: CourseService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CourseService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn-bd": "loYQ",
	"./bn-bd.js": "loYQ",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-in": "7C5Q",
	"./en-in.js": "7C5Q",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./en-sg": "t+mt",
	"./en-sg.js": "t+mt",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-mx": "tbfe",
	"./es-mx.js": "tbfe",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fil": "1ppg",
	"./fil.js": "1ppg",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./ga": "USCx",
	"./ga.js": "USCx",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-deva": "qvJo",
	"./gom-deva.js": "qvJo",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it-ch": "bxKX",
	"./it-ch.js": "bxKX",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ku": "JCF/",
	"./ku.js": "JCF/",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./oc-lnc": "Fnuy",
	"./oc-lnc.js": "Fnuy",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tk": "Wv91",
	"./tk.js": "Wv91",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-mo": "OmwH",
	"./zh-mo.js": "OmwH",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/splash-screen-state.service */ "C8wY");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _splash_splash_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./splash/splash.component */ "eR5p");






;
class AppComponent {
    constructor(splashScreenStateService) {
        this.splashScreenStateService = splashScreenStateService;
        this.title = 'Client';
    }
    ngOnInit() {
        setTimeout(() => {
            this.splashScreenStateService.stop();
        }, 2);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_1__["SplashScreenStateService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 27, vars: 0, consts: [[1, "container-fluid"], [1, "row"], [1, "col-lg-1"], [1, "col-lg-11"], [1, "navbar", "navbar-light", "bg-white"], [1, "form-inline"], ["type", "button", "routerLink", "Student", 1, "btn", "btn-lg", "btn-outline-success"], ["type", "button", "routerLink", "Teacher", 1, "btn", "btn-lg", "btn-outline-success"], ["type", "button", "routerLink", "Subject", 1, "btn", "btn-lg", "btn-outline-success"], ["type", "button", "routerLink", "Course", 1, "btn", "btn-lg", "btn-outline-success"], ["type", "button", "routerLink", "Results", 1, "btn", "btn-lg", "btn-outline-success"], ["type", "button", "routerLink", "Grade", 1, "btn", "btn-lg", "btn-outline-success"], [1, "col-lg-10"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nav", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "form", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Manage Students ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Manage Teachers ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Manage Subjects ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Manage Courses ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " Manage Results ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Manage Grades ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "app-splash");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"], _splash_splash_component__WEBPACK_IMPORTED_MODULE_4__["SplashComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_1__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "VVDR":
/*!*******************************************!*\
  !*** ./src/app/shared/student.service.ts ***!
  \*******************************************/
/*! exports provided: StudentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentService", function() { return StudentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "z9QB");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _course_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./course.service */ "Pv0z");
/* harmony import */ var _subject_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subject.service */ "lLrn");
/* harmony import */ var _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./splash-screen-state.service */ "C8wY");








class StudentService {
    constructor(http, courseService, subjectService, splashScreenStateService) {
        this.http = http;
        this.courseService = courseService;
        this.subjectService = subjectService;
        this.splashScreenStateService = splashScreenStateService;
        this.listDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.formDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetFormDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.closeModalUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.sourceList$ = this.listDataUpdatedSource.asObservable();
        this.formData$ = this.formDataUpdatedSource.asObservable();
        this.resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
        this.closeModal$ = this.closeModalUpdatedSource.asObservable();
        this.refreshList();
        setTimeout(() => {
            this.splashScreenStateService.stop();
        }, 1);
    }
    closeModal() {
        this.closeModalUpdatedSource.next(true);
    }
    notifyListUpdate() {
        this.listDataUpdatedSource.next(this.studentsList);
    }
    populateForm(formData) {
        this.formDataUpdatedSource.next(formData);
    }
    resetFormData(id) {
        this.resetFormDataUpdatedSource.next(id);
    }
    postStudent(formData) {
        return this.http.post(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].studentsBase, formData);
    }
    putStudent(formData) {
        return this.http.put(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].studentsBase + '/' + formData.Id, formData);
    }
    deleteStudent(id) {
        return this.http.delete(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].studentsBase + '/' + id);
    }
    refreshList() {
        this.http.get(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].studentsBase)
            .toPromise()
            .then(res => this.studentsList = res)
            .then(res => this.notifyListUpdate());
    }
    getList() {
        return this.studentsList;
    }
}
StudentService.ɵfac = function StudentService_Factory(t) { return new (t || StudentService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_course_service__WEBPACK_IMPORTED_MODULE_4__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_subject_service__WEBPACK_IMPORTED_MODULE_5__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_6__["SplashScreenStateService"])); };
StudentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: StudentService, factory: StudentService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StudentService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _course_service__WEBPACK_IMPORTED_MODULE_4__["CourseService"] }, { type: _subject_service__WEBPACK_IMPORTED_MODULE_5__["SubjectService"] }, { type: _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_6__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "wTG2");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-multiselect-dropdown */ "Egam");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _student_student_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./student/student.component */ "hLTS");
/* harmony import */ var _student_student_form_student_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./student/student-form/student-form.component */ "u4XX");
/* harmony import */ var _teacher_teacher_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./teacher/teacher.component */ "kgOV");
/* harmony import */ var _teacher_teacher_form_teacher_form_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./teacher/teacher-form/teacher-form.component */ "/jXb");
/* harmony import */ var _subject_subject_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./subject/subject.component */ "0EBP");
/* harmony import */ var _subject_subject_form_subject_form_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./subject/subject-form/subject-form.component */ "mugH");
/* harmony import */ var _course_course_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./course/course.component */ "ioW2");
/* harmony import */ var _course_course_form_course_form_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./course/course-form/course-form.component */ "LLLq");
/* harmony import */ var _grade_grade_form_grade_form_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./grade/grade-form/grade-form.component */ "0pn7");
/* harmony import */ var _grade_grade_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./grade/grade.component */ "nA50");
/* harmony import */ var ng2_date_picker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng2-date-picker */ "GL1M");
/* harmony import */ var _result_result_form_result_form_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./result/result-form/result-form.component */ "uBW2");
/* harmony import */ var _result_result_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./result/result.component */ "nNT0");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser/animations */ "omvX");
/* harmony import */ var _shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./shared/splash-screen-state.service */ "C8wY");
/* harmony import */ var _splash_splash_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./splash/splash.component */ "eR5p");




























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_23__["SplashScreenStateService"],], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"],
            ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_5__["NgMultiSelectDropDownModule"].forRoot(),
            ng2_date_picker__WEBPACK_IMPORTED_MODULE_18__["DpDatePickerModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_21__["ToastrModule"].forRoot(),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
        _student_student_component__WEBPACK_IMPORTED_MODULE_8__["StudentComponent"],
        _student_student_form_student_form_component__WEBPACK_IMPORTED_MODULE_9__["StudentFormComponent"],
        _teacher_teacher_component__WEBPACK_IMPORTED_MODULE_10__["TeacherComponent"],
        _teacher_teacher_form_teacher_form_component__WEBPACK_IMPORTED_MODULE_11__["TeacherFormComponent"],
        _subject_subject_component__WEBPACK_IMPORTED_MODULE_12__["SubjectComponent"],
        _subject_subject_form_subject_form_component__WEBPACK_IMPORTED_MODULE_13__["SubjectFormComponent"],
        _course_course_component__WEBPACK_IMPORTED_MODULE_14__["CourseComponent"],
        _course_course_form_course_form_component__WEBPACK_IMPORTED_MODULE_15__["CourseFormComponent"],
        _grade_grade_form_grade_form_component__WEBPACK_IMPORTED_MODULE_16__["GradeFormComponent"],
        _grade_grade_component__WEBPACK_IMPORTED_MODULE_17__["GradeComponent"],
        _result_result_form_result_form_component__WEBPACK_IMPORTED_MODULE_19__["ResultFormComponent"],
        _result_result_component__WEBPACK_IMPORTED_MODULE_20__["ResultComponent"],
        _splash_splash_component__WEBPACK_IMPORTED_MODULE_24__["SplashComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"], ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_5__["NgMultiSelectDropDownModule"], ng2_date_picker__WEBPACK_IMPORTED_MODULE_18__["DpDatePickerModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_21__["ToastrModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                    _student_student_component__WEBPACK_IMPORTED_MODULE_8__["StudentComponent"],
                    _student_student_form_student_form_component__WEBPACK_IMPORTED_MODULE_9__["StudentFormComponent"],
                    _teacher_teacher_component__WEBPACK_IMPORTED_MODULE_10__["TeacherComponent"],
                    _teacher_teacher_form_teacher_form_component__WEBPACK_IMPORTED_MODULE_11__["TeacherFormComponent"],
                    _subject_subject_component__WEBPACK_IMPORTED_MODULE_12__["SubjectComponent"],
                    _subject_subject_form_subject_form_component__WEBPACK_IMPORTED_MODULE_13__["SubjectFormComponent"],
                    _course_course_component__WEBPACK_IMPORTED_MODULE_14__["CourseComponent"],
                    _course_course_form_course_form_component__WEBPACK_IMPORTED_MODULE_15__["CourseFormComponent"],
                    _grade_grade_form_grade_form_component__WEBPACK_IMPORTED_MODULE_16__["GradeFormComponent"],
                    _grade_grade_component__WEBPACK_IMPORTED_MODULE_17__["GradeComponent"],
                    _result_result_form_result_form_component__WEBPACK_IMPORTED_MODULE_19__["ResultFormComponent"],
                    _result_result_component__WEBPACK_IMPORTED_MODULE_20__["ResultComponent"],
                    _splash_splash_component__WEBPACK_IMPORTED_MODULE_24__["SplashComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                    _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"],
                    ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_5__["NgMultiSelectDropDownModule"].forRoot(),
                    ng2_date_picker__WEBPACK_IMPORTED_MODULE_18__["DpDatePickerModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
                    ngx_toastr__WEBPACK_IMPORTED_MODULE_21__["ToastrModule"].forRoot(),
                ],
                providers: [_shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_23__["SplashScreenStateService"],],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "eR5p":
/*!********************************************!*\
  !*** ./src/app/splash/splash.component.ts ***!
  \********************************************/
/*! exports provided: SplashComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashComponent", function() { return SplashComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/splash-screen-state.service */ "C8wY");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




const _c0 = function (a0, a1) { return { "opacity": a0, "transition": a1 }; };
function SplashComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Loading ... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](1, _c0, ctx_r0.opacityChange, ctx_r0.splashTransition));
} }
class SplashComponent {
    constructor(splashScreenStateService) {
        this.splashScreenStateService = splashScreenStateService;
        // The screen starts with the maximum opacity
        this.opacityChange = 0.6;
        // First access the splash is visible
        this.showSplash = true;
        this.ANIMATION_DURATION = 1;
    }
    hideSplashAnimation() {
        // Setting the transition
        this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
        this.opacityChange = 0;
        setTimeout(() => {
            // After the transition is ended the showSplash will be hided
            this.showSplash = !this.showSplash;
        }, 1000);
    }
    ngOnInit() {
        // Somewhere the stop method has been invoked
        this.splashScreenStateService.subscribe(res => {
            this.hideSplashAnimation();
        });
    }
}
SplashComponent.ɵfac = function SplashComponent_Factory(t) { return new (t || SplashComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_1__["SplashScreenStateService"])); };
SplashComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SplashComponent, selectors: [["app-splash"]], decls: 1, vars: 1, consts: [["class", "app-splash-screen", 3, "ngStyle", 4, "ngIf"], [1, "app-splash-screen", 3, "ngStyle"], [1, "app-splash-content"], ["data-text", "Loading ...", 1, "loading-text"]], template: function SplashComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SplashComponent_div_0_Template, 4, 4, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showSplash);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"]], styles: [".app-splash-screen[_ngcontent-%COMP%] {\r\n   background: #20221b;\r\n   position: fixed;\r\n   top: 0;\r\n   left: 0;\r\n   right: 0;\r\n   bottom: 0;\r\n   display: flex;\r\n   justify-content: center;\r\n   align-items: center;\r\n   width: 100%;\r\n   height: 100%;\r\n   z-index: 1;\r\n   opacity: 0.2;\r\n}\r\n.loading-text[_ngcontent-%COMP%] {\r\n   position: relative;\r\n   color: rgba(0, 0, 0, 0.3);\r\n   font-size: 5em;\r\n}\r\n.loading-text[_ngcontent-%COMP%]:before {\r\n   content: attr(data-text);\r\n   position: absolute;\r\n   overflow: hidden;\r\n   max-width: 7em;\r\n   white-space: nowrap;\r\n   color: #fff;\r\n   animation: loading 8s linear;\r\n}\r\n@keyframes loading {\r\n   0% {\r\n      max-width: 0;\r\n   }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwbGFzaC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0dBQ0csbUJBQW1CO0dBQ25CLGVBQWU7R0FDZixNQUFNO0dBQ04sT0FBTztHQUNQLFFBQVE7R0FDUixTQUFTO0dBQ1QsYUFBYTtHQUNiLHVCQUF1QjtHQUN2QixtQkFBbUI7R0FDbkIsV0FBVztHQUNYLFlBQVk7R0FDWixVQUFVO0dBQ1YsWUFBWTtBQUNmO0FBQ0E7R0FDRyxrQkFBa0I7R0FDbEIseUJBQXlCO0dBQ3pCLGNBQWM7QUFDakI7QUFDQTtHQUNHLHdCQUF3QjtHQUN4QixrQkFBa0I7R0FDbEIsZ0JBQWdCO0dBQ2hCLGNBQWM7R0FDZCxtQkFBbUI7R0FDbkIsV0FBVztHQUNYLDRCQUE0QjtBQUMvQjtBQUNBO0dBQ0c7TUFDRyxZQUFZO0dBQ2Y7QUFDSCIsImZpbGUiOiJzcGxhc2guY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtc3BsYXNoLXNjcmVlbiB7XHJcbiAgIGJhY2tncm91bmQ6ICMyMDIyMWI7XHJcbiAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgdG9wOiAwO1xyXG4gICBsZWZ0OiAwO1xyXG4gICByaWdodDogMDtcclxuICAgYm90dG9tOiAwO1xyXG4gICBkaXNwbGF5OiBmbGV4O1xyXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgd2lkdGg6IDEwMCU7XHJcbiAgIGhlaWdodDogMTAwJTtcclxuICAgei1pbmRleDogMTtcclxuICAgb3BhY2l0eTogMC4yO1xyXG59XHJcbi5sb2FkaW5nLXRleHQge1xyXG4gICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XHJcbiAgIGZvbnQtc2l6ZTogNWVtO1xyXG59XHJcbi5sb2FkaW5nLXRleHQ6YmVmb3JlIHtcclxuICAgY29udGVudDogYXR0cihkYXRhLXRleHQpO1xyXG4gICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgIG1heC13aWR0aDogN2VtO1xyXG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICBjb2xvcjogI2ZmZjtcclxuICAgYW5pbWF0aW9uOiBsb2FkaW5nIDhzIGxpbmVhcjtcclxufVxyXG5Aa2V5ZnJhbWVzIGxvYWRpbmcge1xyXG4gICAwJSB7XHJcbiAgICAgIG1heC13aWR0aDogMDtcclxuICAgfVxyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SplashComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-splash',
                templateUrl: './splash.component.html',
                styleUrls: ['./splash.component.css']
            }]
    }], function () { return [{ type: _shared_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_1__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "f3Tx":
/*!*****************************************!*\
  !*** ./src/app/shared/subject.model.ts ***!
  \*****************************************/
/*! exports provided: Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return Subject; });
class Subject {
    constructor() {
        this.Id = 0;
        this.Name = '';
        this.Code = '';
        this.Teacher = null;
        this.Course = null;
        this.CreditHours = 0;
    }
}


/***/ }),

/***/ "hLTS":
/*!**********************************************!*\
  !*** ./src/app/student/student.component.ts ***!
  \**********************************************/
/*! exports provided: StudentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentComponent", function() { return StudentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/Constants */ "z9QB");
/* harmony import */ var _shared_student_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/student.service */ "VVDR");
/* harmony import */ var _shared_result_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/result.service */ "CLH5");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _student_form_student_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./student-form/student-form.component */ "u4XX");








function StudentComponent_tr_31_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const subject_r4 = ctx.$implicit;
    const counter_r5 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", counter_r5 + 1, ":", ctx_r2.getSubjectName(subject_r4), " ");
} }
function StudentComponent_tr_31_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const subject_r6 = ctx.$implicit;
    const counter_r7 = ctx.index;
    const std_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", counter_r7 + 1, ":", ctx_r3.getGrade(subject_r6, std_r1.Id), " ");
} }
function StudentComponent_tr_31_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, StudentComponent_tr_31_div_10_Template, 3, 2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, StudentComponent_tr_31_div_12_Template, 3, 2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StudentComponent_tr_31_Template_td_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const std_r1 = ctx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.updateStudent(std_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StudentComponent_tr_31_Template_td_click_20_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const std_r1 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.deleteStudent(std_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const std_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](std_r1.RegisterationNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](std_r1.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](std_r1.Birthday);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](std_r1.Course == null ? null : std_r1.Course.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", std_r1.Subjects);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", std_r1.Subjects);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](std_r1.Course == null ? null : std_r1.Course.TotalCreditHours);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((std_r1.Course == null ? null : std_r1.Course.TotalCreditHours) - ctx_r0.getAvailedCreditHours(std_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", ctx_r0.getTooltipForDeleteButton(std_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r0.isDeleteable(std_r1));
} }
class StudentComponent {
    constructor(ngZone, service, resultService, toaster) {
        this.ngZone = ngZone;
        this.service = service;
        this.resultService = resultService;
        this.toaster = toaster;
        this.deleteButtonToolTip = '';
        this.selectedItem = '';
        this.subscriptions = [];
        this.service.refreshList();
        this.resultService.refreshList();
    }
    ngOnInit() {
        window[_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].studentComponentReference] =
            {
                component: this,
                zone: this.ngZone,
                syncData: () => this.service.refreshList()
            };
        this.subscriptions.push(this.service.sourceList$.subscribe(list => { this.studentsList = list; }), this.service.closeModal$.subscribe(data => {
            this.closeModal();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    updateStudent(record) {
        this.service.populateForm(record);
        this.openModal(false);
    }
    deleteStudent(record) {
        this.service.deleteStudent(record.Id).subscribe(result => {
            this.toaster.success('Student deleted successfully', 'Success', { closeButton: true });
        }, error => {
            console.log(error);
            this.toaster.error('An error occured, while deleting student', 'Error', { closeButton: true });
        });
        this.service.resetFormData(record.Id);
    }
    getSubjectName(subjectId, stdId) {
        var _a, _b, _c;
        let subject = (_c = (_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.subjectService) === null || _b === void 0 ? void 0 : _b.subjectList) === null || _c === void 0 ? void 0 : _c.find(x => x.Id == subjectId);
        return subject === null || subject === void 0 ? void 0 : subject.Name;
    }
    getAvailedCreditHours(student) {
        var _a, _b, _c;
        let availedCreditHourse = 0;
        let subjects = (_c = (_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.subjectService) === null || _b === void 0 ? void 0 : _b.subjectList) === null || _c === void 0 ? void 0 : _c.filter(x => { var _a; return (_a = student.Subjects) === null || _a === void 0 ? void 0 : _a.includes(x.Id); });
        subjects === null || subjects === void 0 ? void 0 : subjects.forEach(x => {
            availedCreditHourse += x.CreditHours;
        });
        return availedCreditHourse;
    }
    getGrade(subjectId, stdId) {
        var _a, _b, _c, _d, _e, _f;
        let subject = (_c = (_b = (_a = this.service) === null || _a === void 0 ? void 0 : _a.subjectService) === null || _b === void 0 ? void 0 : _b.subjectList) === null || _c === void 0 ? void 0 : _c.find(x => x.Id == subjectId);
        let result = (_d = this.resultService.resultsList) === null || _d === void 0 ? void 0 : _d.find(x => { var _a, _b; return ((_a = x.Student) === null || _a === void 0 ? void 0 : _a.Id) == stdId && ((_b = x.Subject) === null || _b === void 0 ? void 0 : _b.Id) == (subject === null || subject === void 0 ? void 0 : subject.Id); });
        return ((_e = result === null || result === void 0 ? void 0 : result.Grade) === null || _e === void 0 ? void 0 : _e.Title) ? "(" + ((_f = result === null || result === void 0 ? void 0 : result.Grade) === null || _f === void 0 ? void 0 : _f.Title) + ")" : "TBD";
    }
    isDeleteable(std) {
        var _a;
        return ((_a = std.Results) === null || _a === void 0 ? void 0 : _a.length) <= 0;
    }
    getTooltipForDeleteButton(std) {
        return this.isDeleteable(std) ? "" : "Delete Results associated to this Student first";
    }
    openModal(clearForm) {
        if (clearForm)
            this.service.resetFormData(-1);
        document.getElementById("openModalButton").click();
    }
    closeModal() {
        document.getElementById("closeModalButton").click();
    }
}
StudentComponent.ɵfac = function StudentComponent_Factory(t) { return new (t || StudentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_student_service__WEBPACK_IMPORTED_MODULE_2__["StudentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"])); };
StudentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StudentComponent, selectors: [["app-student"]], inputs: { selectedItem: "selectedItem" }, decls: 49, vars: 2, consts: [[1, "jumbotron", "py-1"], [1, "display-4", "text-center"], [1, "body-content"], [1, "row"], [1, "col-lg-12"], [1, "table-wrapper"], [1, "table"], [1, "thead-light"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-lg", "btn-info", 3, "click"], ["id", "openModalButton", "data-toggle", "modal", "data-target", "#studentModal", 3, "hidden"], ["id", "studentModal", "tabindex", "-1", "role", "dialog", "aria-labelledby", "studentModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "studentModalLabel", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "id", "closeModalButton", "data-target", "#studentModal", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [3, "click"], ["type", "button", 1, "btn", "btn-info"], ["type", "button", "data-toggle", "tooltip", 1, "btn", "btn-danger", 3, "disabled", "title"]], template: function StudentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Students");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "thead", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Registeration Number ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Name ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Birthday ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Course ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Subjects ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Grades ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Total Credit Hours ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Remaining Credit Hours ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, StudentComponent_tr_31_Template, 23, 10, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StudentComponent_Template_button_click_34_listener() { return ctx.openModal(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " Add New Student ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Open Modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Add/Update Student");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "app-student-form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.service.studentsList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _student_form_student_form_component__WEBPACK_IMPORTED_MODULE_6__["StudentFormComponent"]], styles: [".table-wrapper[_ngcontent-%COMP%] {\n  max-height:400px;\n  overflow: auto;\n  max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZUFBZTtBQUNqQiIsImZpbGUiOiJzdHVkZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFibGUtd3JhcHBlciB7XG4gIG1heC1oZWlnaHQ6NDAwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMCU7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StudentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-student',
                templateUrl: './student.component.html',
                styleUrls: ['./student.component.css'],
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: _shared_student_service__WEBPACK_IMPORTED_MODULE_2__["StudentService"] }, { type: _shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }]; }, { selectedItem: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "ioW2":
/*!********************************************!*\
  !*** ./src/app/course/course.component.ts ***!
  \********************************************/
/*! exports provided: CourseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseComponent", function() { return CourseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/Constants */ "z9QB");
/* harmony import */ var _shared_course_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/course.service */ "Pv0z");
/* harmony import */ var _shared_result_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/result.service */ "CLH5");
/* harmony import */ var _shared_grade_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/grade.service */ "uab5");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _course_form_course_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./course-form/course-form.component */ "LLLq");









function CourseComponent_tr_29_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseComponent_tr_29_Template_td_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const course_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.populateForm(course_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseComponent_tr_29_Template_td_click_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const course_r1 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.deleteCourse(course_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const course_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r1.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r1.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r1.Code);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r1.TotalCreditHours);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r1.Students == null ? null : course_r1.Students.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r1.Teachers == null ? null : course_r1.Teachers.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.getAverageGrade(course_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", ctx_r0.getTooltipForDeleteButton(course_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r0.isDeleteable(course_r1));
} }
class CourseComponent {
    constructor(service, ngZone, resultService, gradeService, toastr) {
        this.service = service;
        this.ngZone = ngZone;
        this.resultService = resultService;
        this.gradeService = gradeService;
        this.toastr = toastr;
        this.subscriptions = [];
        gradeService.refreshList();
        resultService.refreshList();
    }
    ngOnInit() {
        this.service.refreshList();
        window[_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].courseComponentReference] =
            {
                component: this,
                zone: this.ngZone,
                syncData: () => this.service.refreshList()
            };
        this.subscriptions.push(this.service.sourceList$.subscribe(list => { this.courseList = list; }), this.service.closeModal$.subscribe(data => {
            this.closeModal();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    populateForm(course) {
        this.openModal(false);
        this.service.populateForm(Object.assign({}, course));
    }
    getAverageGrade(course) {
        var _a, _b;
        let resultsForTheCourse = (_a = this.resultService.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => x.Course.Id == course.Id);
        let sum = 0;
        if (resultsForTheCourse == null) {
            return 'Grades not assigned yet';
        }
        resultsForTheCourse === null || resultsForTheCourse === void 0 ? void 0 : resultsForTheCourse.forEach(function (x) {
            sum += x.ObtainedMarks;
        });
        let average = sum / resultsForTheCourse.length;
        let grade = (_b = this.gradeService.getList()) === null || _b === void 0 ? void 0 : _b.find(x => x.Course.Id == course.Id &&
            x.StartingMarks <= average &&
            x.EndingMarks >= average);
        if (grade == null) {
            return 'N/A';
        }
        return grade === null || grade === void 0 ? void 0 : grade.Title;
    }
    deleteCourse(course) {
        this.service.deleteCourse(course.Id).subscribe(result => {
            this.toastr.success('Course deleted successfully', 'Success', { closeButton: true });
        }, error => {
            this.toastr.error('An error occured, while deleting course', 'Error', { closeButton: true });
            console.log(error);
        });
        this.service.resetFormData(course.Id);
    }
    isDeleteable(course) {
        var _a, _b, _c;
        var result = ((_a = course.Students) === null || _a === void 0 ? void 0 : _a.length) <= 0
            && ((_b = course.Teachers) === null || _b === void 0 ? void 0 : _b.length) <= 0
            && ((_c = course.Subjects) === null || _c === void 0 ? void 0 : _c.length) <= 0;
        return result;
    }
    getTooltipForDeleteButton(course) {
        return this.isDeleteable(course) ? "" : "Delete Students, Teachers and Subjects associated to this Course first";
    }
    openModal(clearForm) {
        if (clearForm)
            this.service.resetFormData(-1);
        document.getElementById("openModalButton").click();
    }
    closeModal() {
        document.getElementById("closeModalButton").click();
    }
}
CourseComponent.ɵfac = function CourseComponent_Factory(t) { return new (t || CourseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_course_service__WEBPACK_IMPORTED_MODULE_2__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_grade_service__WEBPACK_IMPORTED_MODULE_4__["GradeService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"])); };
CourseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CourseComponent, selectors: [["app-course"]], decls: 47, vars: 2, consts: [[1, "jumbotron", "py-3"], [1, "display-4", "text-center"], [1, "body-content"], [1, "row"], [1, "col-lg-12"], [1, "table-wrapper"], [1, "table"], [1, "thead-light"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-lg", "btn-info", 3, "click"], ["id", "openModalButton", "data-toggle", "modal", "data-target", "#courseModal", 3, "hidden"], ["id", "courseModal", "tabindex", "-1", "role", "dialog", "aria-labelledby", "courseModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "courseModalLabel", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "id", "closeModalButton", "data-target", "#courseModal", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [3, "click"], ["type", "button", 1, "btn", "btn-info"], ["type", "button", "data-toggle", "tooltip", 1, "btn", "btn-danger", 3, "disabled", "title"]], template: function CourseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Courses");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "thead", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Id ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Name ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Code ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Ttoal Credit Hours ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Students Enrolled ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Teachers ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Average Grade ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, CourseComponent_tr_29_Template, 21, 9, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CourseComponent_Template_button_click_32_listener() { return ctx.openModal(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " Add New Course ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Open Modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Add/Update Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "app-course-form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.courseList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _course_form_course_form_component__WEBPACK_IMPORTED_MODULE_7__["CourseFormComponent"]], styles: [".table-wrapper[_ngcontent-%COMP%] {\n    max-height: 400px;\n    overflow: auto;\n    max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXJzZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxlQUFlO0FBQ25CIiwiZmlsZSI6ImNvdXJzZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYmxlLXdyYXBwZXIge1xuICAgIG1heC1oZWlnaHQ6IDQwMHB4O1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIG1heC13aWR0aDogMTAwJTtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CourseComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-course',
                templateUrl: './course.component.html',
                styleUrls: ['./course.component.css'],
            }]
    }], function () { return [{ type: _shared_course_service__WEBPACK_IMPORTED_MODULE_2__["CourseService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: _shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"] }, { type: _shared_grade_service__WEBPACK_IMPORTED_MODULE_4__["GradeService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "kVKu":
/*!*****************************************!*\
  !*** ./src/app/shared/teacher.model.ts ***!
  \*****************************************/
/*! exports provided: Teacher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Teacher", function() { return Teacher; });
class Teacher {
    constructor() {
        this.Id = 0;
        this.Salary = 0;
        this.Birthday = '';
        this.Name = '';
    }
}


/***/ }),

/***/ "kgOV":
/*!**********************************************!*\
  !*** ./src/app/teacher/teacher.component.ts ***!
  \**********************************************/
/*! exports provided: TeacherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherComponent", function() { return TeacherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/Constants */ "z9QB");
/* harmony import */ var _shared_subject_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/subject.service */ "lLrn");
/* harmony import */ var _shared_teacher_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/teacher.service */ "sz4S");
/* harmony import */ var _shared_course_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/course.service */ "Pv0z");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _teacher_form_teacher_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./teacher-form/teacher-form.component */ "/jXb");









function TeacherComponent_tr_25_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const subject_r3 = ctx.$implicit;
    const counter_r4 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", counter_r4 + 1, ":", ctx_r2.getSubjectName(subject_r3), " ");
} }
function TeacherComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, TeacherComponent_tr_25_div_10_Template, 3, 2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TeacherComponent_tr_25_Template_td_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const teacher_r1 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.populateForm(teacher_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TeacherComponent_tr_25_Template_td_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const teacher_r1 = ctx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.deleteTeacher(teacher_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const teacher_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](teacher_r1.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](teacher_r1.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](teacher_r1.Birthday);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("$", teacher_r1.Salary, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", teacher_r1.Subjects);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", ctx_r0.getTooltipForDeleteButton(teacher_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r0.isDeleteable(teacher_r1));
} }
class TeacherComponent {
    constructor(subjectService, service, courseService, ngZone, toaster) {
        this.subjectService = subjectService;
        this.service = service;
        this.courseService = courseService;
        this.ngZone = ngZone;
        this.toaster = toaster;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.service.refreshList();
        window[_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].teacherComponentReference] =
            {
                component: this,
                zone: this.ngZone,
                syncData: () => this.service.refreshList()
            };
        this.subscriptions.push(this.service.sourceList$.subscribe(list => { this.teacherList = list; }), this.service.closeModal$.subscribe(data => {
            this.closeModal();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    getSubjectName(subjectId) {
        var _a, _b;
        return (_b = (_a = this.subjectService.getList()) === null || _a === void 0 ? void 0 : _a.find(x => x.Id == subjectId)) === null || _b === void 0 ? void 0 : _b.Name;
    }
    populateForm(record) {
        this.service.populateForm(record);
        this.openModal(false);
    }
    deleteTeacher(record) {
        this.service.deleteTeacher(record.Id).subscribe(result => {
            this.toaster.success('Teacher deleted successfully', 'Success', { closeButton: true });
        }, error => {
            this.toaster.error('An error occured, while deleting teacher', 'Error', { closeButton: true });
            console.log(error);
        });
        this.service.resetFormData(record.Id);
    }
    isDeleteable(record) {
        var _a;
        return ((_a = record.Subjects) === null || _a === void 0 ? void 0 : _a.length) <= 0;
    }
    getTooltipForDeleteButton(std) {
        return this.isDeleteable(std) ? "" : "Delete Subjects associated to this Teacher first";
    }
    openModal(clearForm) {
        if (clearForm)
            this.service.resetFormData(-1);
        document.getElementById("openModalButton").click();
    }
    closeModal() {
        document.getElementById("closeModalButton").click();
    }
}
TeacherComponent.ɵfac = function TeacherComponent_Factory(t) { return new (t || TeacherComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_subject_service__WEBPACK_IMPORTED_MODULE_2__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_teacher_service__WEBPACK_IMPORTED_MODULE_3__["TeacherService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_course_service__WEBPACK_IMPORTED_MODULE_4__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"])); };
TeacherComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TeacherComponent, selectors: [["app-teacher"]], decls: 43, vars: 2, consts: [[1, "jumbotron", "py-3"], [1, "display-4", "text-center"], [1, "body-content"], [1, "row"], [1, "col-md-12"], [1, "table-wrapper"], [1, "table"], [1, "thead-light"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-lg", "btn-info", 3, "click"], ["id", "openModalButton", "data-toggle", "modal", "data-target", "#teacherModal", 3, "hidden"], ["id", "teacherModal", "tabindex", "-1", "role", "dialog", "aria-labelledby", "teacherModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "teacherModalLabel", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "id", "closeModalButton", "data-target", "#teacherModal", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [3, "click"], ["type", "button", 1, "btn", "btn-info"], ["type", "button", "data-toggle", "tooltip", 1, "btn", "btn-danger", 3, "disabled", "title"]], template: function TeacherComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Teachers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "thead", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Id ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Name ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Birthday ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Salary ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Assigned Subjects ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, TeacherComponent_tr_25_Template, 17, 7, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TeacherComponent_Template_button_click_28_listener() { return ctx.openModal(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " Add New Teacher ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Open Modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Add/Update Teacher");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "app-teacher-form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.teacherList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _teacher_form_teacher_form_component__WEBPACK_IMPORTED_MODULE_7__["TeacherFormComponent"]], styles: [".table-wrapper[_ngcontent-%COMP%] {\r\n    max-height: 400px;\r\n    overflow: auto;\r\n    max-width: 100%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYWNoZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsZUFBZTtBQUNuQiIsImZpbGUiOiJ0ZWFjaGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFibGUtd3JhcHBlciB7XHJcbiAgICBtYXgtaGVpZ2h0OiA0MDBweDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TeacherComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-teacher',
                templateUrl: './teacher.component.html',
                styleUrls: ['./teacher.component.css']
            }]
    }], function () { return [{ type: _shared_subject_service__WEBPACK_IMPORTED_MODULE_2__["SubjectService"] }, { type: _shared_teacher_service__WEBPACK_IMPORTED_MODULE_3__["TeacherService"] }, { type: _shared_course_service__WEBPACK_IMPORTED_MODULE_4__["CourseService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "lLrn":
/*!*******************************************!*\
  !*** ./src/app/shared/subject.service.ts ***!
  \*******************************************/
/*! exports provided: SubjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectService", function() { return SubjectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "z9QB");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./splash-screen-state.service */ "C8wY");






class SubjectService {
    constructor(http, splashScreenStateService) {
        this.http = http;
        this.splashScreenStateService = splashScreenStateService;
        this.subjectList = null;
        this.listDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.formDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetFormDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.closeModalUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.sourceList$ = this.listDataUpdatedSource.asObservable();
        this.formData$ = this.formDataUpdatedSource.asObservable();
        this.resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
        this.closeModal$ = this.closeModalUpdatedSource.asObservable();
        this.refreshList();
        setTimeout(() => {
            this.splashScreenStateService.stop();
        }, 1);
    }
    closeModal() {
        this.closeModalUpdatedSource.next(true);
    }
    notifyListUpdate() {
        this.listDataUpdatedSource.next(this.subjectList);
    }
    populateForm(formData) {
        this.formDataUpdatedSource.next(formData);
    }
    resetFormData(id) {
        this.resetFormDataUpdatedSource.next(id);
    }
    postSubject(formData) {
        return this.http.post(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].subjectsBase, formData);
    }
    putSubject(formData) {
        return this.http.put(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].subjectsBase + '/' + formData.Id, formData);
    }
    deleteSubject(id) {
        return this.http.delete(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].subjectsBase + '/' + id);
    }
    refreshList() {
        this.http.get(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].subjectsBase)
            .toPromise()
            .then(res => this.subjectList = res)
            .then(res => this.notifyListUpdate());
    }
    getList() {
        return this.subjectList;
    }
}
SubjectService.ɵfac = function SubjectService_Factory(t) { return new (t || SubjectService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__["SplashScreenStateService"])); };
SubjectService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SubjectService, factory: SubjectService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SubjectService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "mj4c":
/*!*****************************************!*\
  !*** ./src/app/shared/student.model.ts ***!
  \*****************************************/
/*! exports provided: Student */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Student", function() { return Student; });
class Student {
    constructor() {
        this.Id = 0;
        this.RegisterationNumber = '';
        this.Name = '';
        this.Course = null;
        this.Birthday = '';
    }
}


/***/ }),

/***/ "mugH":
/*!****************************************************************!*\
  !*** ./src/app/subject/subject-form/subject-form.component.ts ***!
  \****************************************************************/
/*! exports provided: SubjectFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectFormComponent", function() { return SubjectFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_subject_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/subject.model */ "f3Tx");
/* harmony import */ var _shared_subject_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/subject.service */ "lLrn");
/* harmony import */ var src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/course.service */ "Pv0z");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function SubjectFormComponent_button_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SubjectFormComponent_button_17_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const course_r6 = ctx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.selectCourse(course_r6); })("click", function SubjectFormComponent_button_17_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const course_r6 = ctx.$implicit; _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](16); return _r1.value = course_r6; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const course_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](course_r6.Name + " " + course_r6.Code);
} }
class SubjectFormComponent {
    constructor(service, courseService, toaster) {
        this.service = service;
        this.courseService = courseService;
        this.toaster = toaster;
        this.formData = new src_app_shared_subject_model__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.courseDropDownCelectedValue = 'Select Course';
        this.CourseSelcetValidationMesage = ': Required';
        this.subscriptions = [];
    }
    ngOnInit() {
        this.resetFormData();
        this.subscriptions.push(this.service.formData$.subscribe(formData => { this.populateForm(formData); }), this.service.resetFormData$.subscribe(data => {
            this.resetFormDataOnDelete(data);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    selectCourse(course) {
        this.courseDropDownCelectedValue = course.Name;
        this.formData.Course = course;
        this.CourseSelcetValidationMesage = '';
    }
    populateForm(subject) {
        var _a;
        this.courseDropDownCelectedValue = (_a = subject.Course) === null || _a === void 0 ? void 0 : _a.Name;
        this.formData = Object.assign({}, subject);
    }
    onSubmit(form) {
        if (this.isFormInvalid()) {
            this.setValidationMessages();
        }
        else {
            if (this.formData.Id == 0) {
                this.inserRecord(form);
            }
            else {
                this.updateRecord(form);
            }
        }
    }
    isFormInvalid() {
        return this.formData.Course == null
            || this.isDuplicateRecord();
    }
    isDuplicateRecord() {
        var _a;
        return ((_a = this.service.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => {
            var _a, _b;
            return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == ((_b = this.formData.Course) === null || _b === void 0 ? void 0 : _b.Id)
                && x.Code == this.formData.Code
                && x.CreditHours == this.formData.CreditHours
                && this.formData.Id == 0;
        }).length) > 0;
    }
    setValidationMessages() {
        if (this.isDuplicateRecord()) {
            this.toaster.error("Subject already exists. Use update option", "Error", { closeButton: true });
        }
        else {
            this.CourseSelcetValidationMesage = ": Required";
        }
    }
    inserRecord(form) {
        this.service.postSubject(this.formData).subscribe(result => {
            this.toaster.success('Subject added successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.refreshList();
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while adding the new subject', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    updateRecord(form) {
        this.service.putSubject(this.formData).subscribe(result => {
            this.toaster.success('Subject updated successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.refreshList();
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while updating the new subject', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    resetForm(form) {
        form.form.reset();
        this.resetFormData();
    }
    resetFormData() {
        this.formData = new src_app_shared_subject_model__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.courseDropDownCelectedValue = 'Select Course';
        this.CourseSelcetValidationMesage = '';
    }
    resetFormDataOnDelete(id) {
        if (id == this.formData.Id || id == -1) {
            this.resetFormData();
        }
    }
}
SubjectFormComponent.ɵfac = function SubjectFormComponent_Factory(t) { return new (t || SubjectFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_subject_service__WEBPACK_IMPORTED_MODULE_2__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"])); };
SubjectFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SubjectFormComponent, selectors: [["app-subject-form"]], decls: 46, vars: 8, consts: [[1, "row"], ["ngNativeValidate", "", 3, "submit"], ["form", "ngForm"], [1, "col", "col-lg-12"], ["type", "hidden", "name", "id", 3, "value"], [1, "label", "label-default"], [1, "lbl-required"], [1, "label", "label-default", "text-danger"], [1, "form-group"], [1, "dropdown"], ["id", "dropdownMenuButton", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", "required", "", 1, "btn", "btn-secondary", "dropdown-toggle", "drp-dwn"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu"], ["courseSelected", ""], ["type", "button", "class", "dropdown-item", "required", "", 3, "click", 4, "ngFor", "ngForOf"], ["placeholder", "Subject Name", "name", "name", "required", "", "maxlength", "100", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["subjectName", "ngModel"], ["placeholder", "Subject Code", "name", "code", "required", "", "maxlength", "100", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["subjectCode", "ngModel"], ["placeholder", "Credit Hours", "name", "creditHours", "required", "", "type", "number", "max", "3", "min", "1", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["creditHours", "ngModel"], [1, "form-group", "col-md-6"], ["type", "button", 1, "btn", "btn-info", "btn-lg", "btn-block", 3, "click"], ["type", "submit", 1, "btn", "btn-info", "btn-lg", "btn-block"], ["type", "button", "required", "", 1, "dropdown-item", 3, "click"]], template: function SubjectFormComponent_Template(rf, ctx) { if (rf & 1) {
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function SubjectFormComponent_Template_form_submit_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.onSubmit(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, SubjectFormComponent_button_17_Template, 2, 1, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "input", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SubjectFormComponent_Template_input_ngModelChange_23_listener($event) { return ctx.formData.Name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "input", 16, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SubjectFormComponent_Template_input_ngModelChange_30_listener($event) { return ctx.formData.Code = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Credit Hours");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "input", 18, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SubjectFormComponent_Template_input_ngModelChange_37_listener($event) { return ctx.formData.CreditHours = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SubjectFormComponent_Template_button_click_41_listener() { return ctx.resetFormData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.formData.Id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.CourseSelcetValidationMesage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.courseDropDownCelectedValue, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.courseService.getList());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Code);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.CreditHours);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.formData.Id != 0 ? "Update" : "Add", " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NumberValueAccessor"]], styles: [".drp-dwn[_ngcontent-%COMP%] {\n  width: 260px;\n  max-width: 100%;\n  height: 48px;\n    max-height: 100%;\n}\n.lbl-required[_ngcontent-%COMP%] {\n  color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YmplY3QtZm9ybS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLGVBQWU7RUFDZixZQUFZO0lBQ1YsZ0JBQWdCO0FBQ3BCO0FBQ0E7RUFDRSxVQUFVO0FBQ1oiLCJmaWxlIjoic3ViamVjdC1mb3JtLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZHJwLWR3biB7XG4gIHdpZHRoOiAyNjBweDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQ4cHg7XG4gICAgbWF4LWhlaWdodDogMTAwJTtcbn1cbi5sYmwtcmVxdWlyZWQge1xuICBjb2xvcjogcmVkO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SubjectFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-subject-form',
                templateUrl: './subject-form.component.html',
                styleUrls: ['./subject-form.component.css'],
                styles: []
            }]
    }], function () { return [{ type: _shared_subject_service__WEBPACK_IMPORTED_MODULE_2__["SubjectService"] }, { type: src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "nA50":
/*!******************************************!*\
  !*** ./src/app/grade/grade.component.ts ***!
  \******************************************/
/*! exports provided: GradeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeComponent", function() { return GradeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/Constants */ "z9QB");
/* harmony import */ var _shared_grade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/grade.service */ "uab5");
/* harmony import */ var _shared_result_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/result.service */ "CLH5");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _grade_form_grade_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./grade-form/grade-form.component */ "0pn7");








function GradeComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GradeComponent_tr_25_Template_td_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const grade_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.populateForm(grade_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GradeComponent_tr_25_Template_td_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const grade_r1 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.deleteGrade(grade_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const grade_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](grade_r1.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](grade_r1.Title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](grade_r1.StartingMarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](grade_r1.EndingMarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](grade_r1.Course == null ? null : grade_r1.Course.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", ctx_r0.getTooltipForDeleteButton(grade_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx_r0.isDeleteable(grade_r1));
} }
class GradeComponent {
    constructor(service, resultService, ngZone, toastr) {
        this.service = service;
        this.resultService = resultService;
        this.ngZone = ngZone;
        this.toastr = toastr;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.service.refreshList();
        window[_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].gradeComponentReference] =
            {
                component: this,
                zone: this.ngZone,
                syncData: () => this.service.refreshList()
            };
        this.subscriptions.push(this.service.sourceList$.subscribe(list => { this.gradesList = list; }), this.service.closeModal$.subscribe(data => {
            this.closeModal();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    populateForm(grade) {
        this.openModal(false);
        this.service.sendFormData(Object.assign({}, grade));
    }
    deleteGrade(grade) {
        this.service.deleteGrade(grade.Id).subscribe(result => {
            this.toastr.success('Grade deleted successfully', 'Success', { closeButton: true });
        }, error => {
            this.toastr.error('An error occured, while deleting grade', 'Error', { closeButton: true });
            console.log(error);
        });
        this.service.resetFormData(grade.Id);
    }
    isDeleteable(grade) {
        var _a, _b;
        return ((_b = (_a = this.resultService.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => { var _a; return ((_a = x.Grade) === null || _a === void 0 ? void 0 : _a.Id) == grade.Id; })) === null || _b === void 0 ? void 0 : _b.length) <= 0;
    }
    getTooltipForDeleteButton(grade) {
        return this.isDeleteable(grade) ? "" : "Delete 'Results' associated to this 'Grade' first";
    }
    getgradesList() {
        console.log("Grades List Retunring");
        return this.gradesList;
    }
    openModal(clearForm) {
        if (clearForm)
            this.service.resetFormData(-1);
        document.getElementById("openModalButton").click();
    }
    closeModal() {
        document.getElementById("closeModalButton").click();
    }
}
GradeComponent.ɵfac = function GradeComponent_Factory(t) { return new (t || GradeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_grade_service__WEBPACK_IMPORTED_MODULE_2__["GradeService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"])); };
GradeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GradeComponent, selectors: [["app-grade"]], decls: 43, vars: 2, consts: [[1, "jumbotron", "py-3"], [1, "display-4", "text-center"], [1, "body-content"], [1, "row"], [1, "col-lg-12"], [1, "table-wrapper"], [1, "table"], [1, "thead-light"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-lg", "btn-info", 3, "click"], ["id", "openModalButton", "data-toggle", "modal", "data-target", "#gradeModal", 3, "hidden"], ["id", "gradeModal", "tabindex", "-1", "role", "dialog", "aria-labelledby", "gradeModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "gradeModalLabel", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "id", "closeModalButton", "data-target", "#gradeModal", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [3, "click"], ["type", "button", 1, "btn", "btn-info"], ["type", "button", "data-toggle", "tooltip", 1, "btn", "btn-danger", 3, "disabled", "title"]], template: function GradeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Grades");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "thead", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Id ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Title ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Starting Marks ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Ending Marks ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Course ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, GradeComponent_tr_25_Template, 17, 7, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GradeComponent_Template_button_click_28_listener() { return ctx.openModal(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " Add New Grade ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Open Modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Add/Update Grade");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "app-grade-form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.gradesList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _grade_form_grade_form_component__WEBPACK_IMPORTED_MODULE_6__["GradeFormComponent"]], styles: [".table-wrapper[_ngcontent-%COMP%] {\n    max-height: 400px;\n    overflow: auto;\n    max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYWRlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxpQkFBaUI7SUFDakIsY0FBYztJQUNkLGVBQWU7QUFDbkIiLCJmaWxlIjoiZ3JhZGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50YWJsZS13cmFwcGVyIHtcbiAgICBtYXgtaGVpZ2h0OiA0MDBweDtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GradeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-grade',
                templateUrl: './grade.component.html',
                styleUrls: ['./grade.component.css'],
            }]
    }], function () { return [{ type: _shared_grade_service__WEBPACK_IMPORTED_MODULE_2__["GradeService"] }, { type: _shared_result_service__WEBPACK_IMPORTED_MODULE_3__["ResultService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "nNT0":
/*!********************************************!*\
  !*** ./src/app/result/result.component.ts ***!
  \********************************************/
/*! exports provided: ResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultComponent", function() { return ResultComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/Constants */ "z9QB");
/* harmony import */ var _shared_result_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/result.service */ "CLH5");
/* harmony import */ var _shared_subject_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/subject.service */ "lLrn");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _result_form_result_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./result-form/result-form.component */ "uBW2");








function ResultComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultComponent_tr_25_Template_td_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const result_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.updateResult(result_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultComponent_tr_25_Template_td_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const result_r1 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.deleteResult(result_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const result_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](result_r1.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](result_r1.Student == null ? null : result_r1.Student.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](result_r1.Subject == null ? null : result_r1.Subject.Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](result_r1.ObtainedMarks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](result_r1.Grade == null ? null : result_r1.Grade.Title);
} }
class ResultComponent {
    constructor(service, subjectService, ngZone, toaster) {
        this.service = service;
        this.subjectService = subjectService;
        this.ngZone = ngZone;
        this.toaster = toaster;
        this.modalId = "resultModal";
        this.modalSelector = this.modalId;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.service.refreshList();
        window[_shared_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].resultComponentReference] = { component: this, zone: this.ngZone, syncData: () => this.service.refreshList() };
        this.subscriptions.push(this.service.sourceList$.subscribe(list => { this.resultsList = list; }), this.service.closeModal$.subscribe(data => {
            this.closeModal();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    updateResult(record) {
        this.openModal(false);
        this.service.populateForm(Object.assign({}, record));
    }
    deleteResult(record) {
        this.service.deleteResult(record.Id).subscribe(result => {
            this.toaster.success('Result deleted successfully', 'Success', { closeButton: true });
        }, error => {
            this.toaster.error('An error occured, while deleting result', 'Error', { closeButton: true });
            console.log(error);
        });
        this.service.resetFormData(record.Id);
    }
    openModal(clearForm) {
        if (clearForm)
            this.service.resetFormData(-1);
        document.getElementById("openModalButton").click();
    }
    closeModal() {
        document.getElementById("closeModalButton").click();
    }
}
ResultComponent.ɵfac = function ResultComponent_Factory(t) { return new (t || ResultComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_result_service__WEBPACK_IMPORTED_MODULE_2__["ResultService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_subject_service__WEBPACK_IMPORTED_MODULE_3__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"])); };
ResultComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ResultComponent, selectors: [["app-result"]], decls: 43, vars: 2, consts: [[1, "jumbotron", "py-3"], [1, "display-4", "text-center"], [1, "body-content"], [1, "row"], [1, "col-md-12"], [1, "table-wrapper"], [1, "table"], [1, "thead-light"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-lg", "btn-info", 3, "click"], ["id", "openModalButton", "data-toggle", "modal", "data-target", "#resultModal", 3, "hidden"], ["id", "resultModal", "tabindex", "-1", "role", "dialog", "aria-labelledby", "resultModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "resultModalLabel", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "id", "closeModalButton", "data-target", "#resultModal", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [3, "click"], ["type", "button", 1, "btn", "btn-info"], [1, "glyphicon", "glyphicon-edit"], ["type", "button", 1, "btn", "btn-danger"]], template: function ResultComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Results");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "thead", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Id ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Student ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Subject ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Obtained Marks ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Grade ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Action");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, ResultComponent_tr_25_Template, 18, 5, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultComponent_Template_button_click_28_listener() { return ctx.openModal(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " Add New Result ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Open Modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "h5", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Add/Update Result");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "app-result-form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.resultsList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _result_form_result_form_component__WEBPACK_IMPORTED_MODULE_6__["ResultFormComponent"]], styles: [".table-wrapper[_ngcontent-%COMP%] {\r\n    max-height: 400px;\r\n    overflow: auto;\r\n    max-width: 100%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxlQUFlO0FBQ25CIiwiZmlsZSI6InJlc3VsdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYmxlLXdyYXBwZXIge1xyXG4gICAgbWF4LWhlaWdodDogNDAwcHg7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ResultComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-result',
                templateUrl: './result.component.html',
                styleUrls: ['./result.component.css']
            }]
    }], function () { return [{ type: _shared_result_service__WEBPACK_IMPORTED_MODULE_2__["ResultService"] }, { type: _shared_subject_service__WEBPACK_IMPORTED_MODULE_3__["SubjectService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "sz4S":
/*!*******************************************!*\
  !*** ./src/app/shared/teacher.service.ts ***!
  \*******************************************/
/*! exports provided: TeacherService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeacherService", function() { return TeacherService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "z9QB");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _subject_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subject.service */ "lLrn");
/* harmony import */ var _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./splash-screen-state.service */ "C8wY");







class TeacherService {
    constructor(http, subjectService, splashScreenStateService) {
        this.http = http;
        this.subjectService = subjectService;
        this.splashScreenStateService = splashScreenStateService;
        this.listDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.formDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetFormDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.closeModalUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.sourceList$ = this.listDataUpdatedSource.asObservable();
        this.formData$ = this.formDataUpdatedSource.asObservable();
        this.resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
        this.closeModal$ = this.closeModalUpdatedSource.asObservable();
        subjectService.refreshList();
        setTimeout(() => {
            this.splashScreenStateService.stop();
        }, 1);
    }
    closeModal() {
        this.closeModalUpdatedSource.next(true);
    }
    notifyListUpdate() {
        this.listDataUpdatedSource.next(this.teacherList);
    }
    populateForm(formData) {
        this.formDataUpdatedSource.next(formData);
    }
    resetFormData(id) {
        this.resetFormDataUpdatedSource.next(id);
    }
    postTeacher(formData) {
        return this.http.post(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].teachersBase, formData);
    }
    putTeacher(formData) {
        return this.http.put(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].teachersBase + '/' + formData.Id, formData);
    }
    deleteTeacher(id) {
        return this.http.delete(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].teachersBase + '/' + id);
    }
    refreshList() {
        this.http.get(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].teachersBase)
            .toPromise()
            .then(res => this.teacherList = res)
            .then(res => this.notifyListUpdate());
    }
    getList() {
        return this.teacherList;
    }
}
TeacherService.ɵfac = function TeacherService_Factory(t) { return new (t || TeacherService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_5__["SplashScreenStateService"])); };
TeacherService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TeacherService, factory: TeacherService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TeacherService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"] }, { type: _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_5__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "u4XX":
/*!****************************************************************!*\
  !*** ./src/app/student/student-form/student-form.component.ts ***!
  \****************************************************************/
/*! exports provided: StudentFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentFormComponent", function() { return StudentFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_student_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/student.model */ "mj4c");
/* harmony import */ var _shared_student_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/student.service */ "VVDR");
/* harmony import */ var src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/course.service */ "Pv0z");
/* harmony import */ var src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/subject.service */ "lLrn");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-multiselect-dropdown */ "Egam");










function StudentFormComponent_button_31_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StudentFormComponent_button_31_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const course_r5 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.onSelectCourse(course_r5); })("click", function StudentFormComponent_button_31_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const course_r5 = ctx.$implicit; _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](30); return _r3.value = course_r5; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const course_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", course_r5.Name + " " + course_r5.Code, " ");
} }
class StudentFormComponent {
    constructor(service, courseService, subjectService, toaster) {
        this.service = service;
        this.courseService = courseService;
        this.subjectService = subjectService;
        this.toaster = toaster;
        this.subjectsDropdownSettings = {};
        this.isFormValid = true;
        this.subjectsSelectionClass = 'text-success';
        this.courseSelectionClass = 'text-success';
        this.courseDropDownDefaultValue = 'Select Course';
        this.genderDropDownDefaultValue = 'Select Gender';
        this.genderOptions = ['Male', 'Female', 'Other'];
        this.SubjectsSelcetValidationMesage = '';
        this.CourseSelcetValidationMesage = '';
        this.selectedCourseByStudent = this.courseDropDownDefaultValue;
        this.formData = new src_app_shared_student_model__WEBPACK_IMPORTED_MODULE_1__["Student"]();
        this.subscriptions = [];
        this.subjectsDropdownSettings = {
            singleSelection: false,
            idField: 'Id',
            textField: 'Name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            noDataAvailablePlaceholderText: 'Select a course first',
            limitSelection: 6,
            itemsShowLimit: 6,
            allowSearchFilter: true
        };
    }
    ngOnInit() {
        this.resetFormData();
        this.subscriptions.push(this.service.formData$.subscribe(data => {
            this.populateForm(data);
        }), this.service.resetFormData$.subscribe(data => {
            this.resetFormDataOnDelete(data);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    resetFormData() {
        this.formData = new src_app_shared_student_model__WEBPACK_IMPORTED_MODULE_1__["Student"]();
        this.selectedCourseByStudent = this.courseDropDownDefaultValue;
        this.selectedSubjectsByStudent = null;
        this.subjectsInselcetedCourse = null;
        this.SubjectsSelcetValidationMesage = '';
    }
    onSelectCourse(course) {
        var _a, _b;
        if ((course === null || course === void 0 ? void 0 : course.Id) != ((_b = (_a = this.formData) === null || _a === void 0 ? void 0 : _a.Course) === null || _b === void 0 ? void 0 : _b.Id)) {
            this.selectedCourseByStudent = course.Name;
            this.formData.Course = course;
            this.subjectsInselcetedCourse = this.subjectService.getList().filter(x => { var _a; return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == (course === null || course === void 0 ? void 0 : course.Id); });
            this.selectedSubjectsByStudent = [];
            this.SubjectsSelcetValidationMesage = ' ' + course.TotalCreditHours + ' Credit Hours Left';
            this.CourseSelcetValidationMesage = '';
        }
    }
    populateForm(student) {
        var _a, _b;
        this.formData = Object.assign({}, student);
        this.selectedCourseByStudent = (_a = student.Course) === null || _a === void 0 ? void 0 : _a.Name;
        this.subjectsInselcetedCourse = (_b = this.subjectService.getList()) === null || _b === void 0 ? void 0 : _b.filter(x => { var _a, _b; return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == ((_b = student.Course) === null || _b === void 0 ? void 0 : _b.Id); });
        this.selectedSubjectsByStudent = this.getSelctedSubjectListWithAllDetails();
    }
    getSelctedSubjectListWithAllDetails() {
        let list = [];
        let form = this.formData;
        this.subjectsInselcetedCourse.filter(function (x) {
            var _a;
            if ((_a = form === null || form === void 0 ? void 0 : form.Subjects) === null || _a === void 0 ? void 0 : _a.includes(x.Id)) {
                list.push(x);
            }
        });
        return list;
    }
    onSubmit(form) {
        if (this.isCourseSelectionValid()) {
            this.courseSelectionClass = 'text-danger';
            this.CourseSelcetValidationMesage = ' :Required';
        }
        else if (this.isFormValid) {
            if (this.isDuplicateRecord()) {
                this.toaster.error("Student already exists. Use update option", "Error", { closeButton: true });
            }
            else {
                this.formData.Subjects = this.selectedSubjectsByStudent.map(a => a.Id);
                if (this.formData.Id == 0) {
                    this.inserRecord(form);
                }
                else {
                    this.updateRecord(form);
                }
            }
        }
    }
    isDuplicateRecord() {
        var _a;
        return ((_a = this.service.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => x.Birthday == this.formData.Birthday
            && x.Name == this.formData.Name
            && this.formData.Id == 0).length) > 0;
    }
    inserRecord(form) {
        this.service.postStudent(this.formData).subscribe(result => {
            this.toaster.success('Student added successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while adding the new student', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    updateRecord(form) {
        this.service.putStudent(this.formData).subscribe(result => {
            this.toaster.success('Student updated successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while updating the new student', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    resetForm(form) {
        form.form.reset();
        this.resetFormData();
    }
    onSubjectSelect(item) {
        this.validateSubjectSelection();
    }
    onSelectAllSubjects(items) {
        this.validateSubjectSelection();
    }
    onSubjectDeselect(item) {
        this.validateSubjectSelection();
    }
    validateSubjectSelection() {
        var _a, _b;
        let allowed = (_a = this.formData.Course) === null || _a === void 0 ? void 0 : _a.TotalCreditHours;
        let availed = 0;
        (_b = this.subjectsInselcetedCourse) === null || _b === void 0 ? void 0 : _b.forEach(course => {
            var _a;
            if (((_a = this.selectedSubjectsByStudent) === null || _a === void 0 ? void 0 : _a.find(x => x.Id == course.Id)) != undefined) {
                availed += course.CreditHours;
            }
        });
        let difference = allowed - availed;
        if (availed < allowed) {
            this.subjectsSelectionClass = 'text-info';
            this.isFormValid = true;
            this.SubjectsSelcetValidationMesage = ': ' + difference + ' Credit hour(s) left';
        }
        else if (availed > allowed) {
            this.subjectsSelectionClass = 'text-danger';
            this.isFormValid = false;
            this.SubjectsSelcetValidationMesage = +(availed - allowed) + ' Extra credit hour(s), remove subject(s)';
        }
        else if (availed == allowed) {
            this.subjectsSelectionClass = 'text-info';
            this.SubjectsSelcetValidationMesage = ' : All credit hours availed';
            this.isFormValid = true;
        }
    }
    isCourseSelectionValid() {
        return this.selectedCourseByStudent == this.courseDropDownDefaultValue;
    }
    resetFormDataOnDelete(id) {
        if (id == this.formData.Id || id == -1) {
            this.resetFormData();
        }
    }
}
StudentFormComponent.ɵfac = function StudentFormComponent_Factory(t) { return new (t || StudentFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_student_service__WEBPACK_IMPORTED_MODULE_2__["StudentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"])); };
StudentFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StudentFormComponent, selectors: [["app-student-form"]], decls: 45, vars: 18, consts: [[1, "row"], ["ngNativeValidate", "", 3, "submit"], ["form", "ngForm"], [1, "col", "col-lg-12"], ["type", "hidden", "name", "id", 3, "value"], [1, "form-group"], [1, "label", "label-default"], [1, "lbl-required"], ["placeholder", "Name", "name", "name", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["Name", "ngModel"], ["type", "date", "placeholder", "Pick Date Of Birth", "name", "dob", "max", "2010-12-31", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "ngModelChange"], ["dob", "ngModel"], [1, "dropdown"], ["id", "dropdownMenuButton", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", 1, "btn", "btn-secondary", "dropdown-toggle", "drp-dwn"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu"], ["courseSelected", ""], ["type", "button", "class", "dropdown-item", 3, "click", 4, "ngFor", "ngForOf"], ["name", "subjectSelect", 3, "placeholder", "settings", "data", "ngModel", "ngModelChange", "onSelect", "onSelectAll", "onDeSelect"], [1, "form-group", "col-md-6"], ["type", "button", 1, "btn", "btn-info", "btn-lg", "btn-block", 3, "click"], ["type", "submit", 1, "btn", "btn-info", "btn-lg", "btn-block"], ["type", "button", 1, "dropdown-item", 3, "click"]], template: function StudentFormComponent_Template(rf, ctx) { if (rf & 1) {
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function StudentFormComponent_Template_form_submit_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.onSubmit(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function StudentFormComponent_Template_input_ngModelChange_10_listener($event) { return ctx.formData.Name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Birthday");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "input", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function StudentFormComponent_Template_input_ngModelChange_17_listener($event) { return ctx.formData.Birthday = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, StudentFormComponent_button_31_Template, 2, 1, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Subjects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "ng-multiselect-dropdown", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function StudentFormComponent_Template_ng_multiselect_dropdown_ngModelChange_37_listener($event) { return ctx.selectedSubjectsByStudent = $event; })("onSelect", function StudentFormComponent_Template_ng_multiselect_dropdown_onSelect_37_listener($event) { return ctx.onSubjectSelect($event); })("onSelectAll", function StudentFormComponent_Template_ng_multiselect_dropdown_onSelectAll_37_listener($event) { return ctx.onSelectAllSubjects($event); })("onDeSelect", function StudentFormComponent_Template_ng_multiselect_dropdown_onDeSelect_37_listener($event) { return ctx.onSubjectDeselect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StudentFormComponent_Template_button_click_40_listener() { return ctx.resetFormData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.formData.Id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.Birthday);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("label label-default ", ctx.courseSelectionClass, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.CourseSelcetValidationMesage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.selectedCourseByStudent, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.courseService.getList());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("label label-default ", ctx.subjectsSelectionClass, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.SubjectsSelcetValidationMesage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("placeholder", "Select Subject(s)")("settings", ctx.subjectsDropdownSettings)("data", ctx.subjectsInselcetedCourse)("ngModel", ctx.selectedSubjectsByStudent);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.formData.Id != 0 ? "Update" : "Add", " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_8__["MultiSelectComponent"]], styles: [".drp-dwn[_ngcontent-%COMP%] {\r\n    width: 260px;\r\n    max-width: 100%;\r\n    height: 48px;\r\n    max-height: 100%;\r\n}\r\n.lbl-required[_ngcontent-%COMP%]{\r\n    color: red;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnQtZm9ybS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1osZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxVQUFVO0FBQ2QiLCJmaWxlIjoic3R1ZGVudC1mb3JtLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZHJwLWR3biB7XHJcbiAgICB3aWR0aDogMjYwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQ4cHg7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi5sYmwtcmVxdWlyZWR7XHJcbiAgICBjb2xvcjogcmVkO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StudentFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-student-form',
                templateUrl: './student-form.component.html',
                styleUrls: ['./student-form.component.css'],
                styles: [],
            }]
    }], function () { return [{ type: _shared_student_service__WEBPACK_IMPORTED_MODULE_2__["StudentService"] }, { type: src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_3__["CourseService"] }, { type: src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "u9X8":
/*!****************************************!*\
  !*** ./src/app/shared/result.model.ts ***!
  \****************************************/
/*! exports provided: Result */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Result", function() { return Result; });
class Result {
    constructor() {
        this.Id = 0;
        this.Course = null;
        this.Student = null;
        this.Subject = null;
        this.ObtainedMarks = 0;
        this.Grade = null;
    }
}


/***/ }),

/***/ "uBW2":
/*!*************************************************************!*\
  !*** ./src/app/result/result-form/result-form.component.ts ***!
  \*************************************************************/
/*! exports provided: ResultFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultFormComponent", function() { return ResultFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_shared_result_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/result.model */ "u9X8");
/* harmony import */ var src_app_shared_result_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/result.service */ "CLH5");
/* harmony import */ var src_app_shared_student_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/student.service */ "VVDR");
/* harmony import */ var src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/subject.service */ "lLrn");
/* harmony import */ var src_app_shared_grade_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/grade.service */ "uab5");
/* harmony import */ var src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/course.service */ "Pv0z");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "EApP");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");











const _c0 = ["selectedSubject"];
function ResultFormComponent_button_17_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultFormComponent_button_17_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.calculateGrade(); })("click", function ResultFormComponent_button_17_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const course_r8 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.onCourseSelect(course_r8); })("click", function ResultFormComponent_button_17_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const course_r8 = ctx.$implicit; _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](16); return _r1.value = course_r8.Name; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const course_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", course_r8.Name, " ");
} }
function ResultFormComponent_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultFormComponent_button_30_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.calculateGrade(); })("click", function ResultFormComponent_button_30_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const subject_r13 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.onSubjectSelect(subject_r13); })("click", function ResultFormComponent_button_30_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const subject_r13 = ctx.$implicit; _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](29); return _r3.value = subject_r13.Name; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const subject_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", subject_r13.Name, " ");
} }
function ResultFormComponent_button_43_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultFormComponent_button_43_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const student_r18 = ctx.$implicit; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.onStudentSelect(student_r18); })("click", function ResultFormComponent_button_43_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const student_r18 = ctx.$implicit; _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](42); return _r5.value = student_r18.Name; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const student_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", student_r18.Name, " ");
} }
class ResultFormComponent {
    constructor(service, studentService, subjectService, gradeService, courseService, toaster) {
        this.service = service;
        this.studentService = studentService;
        this.subjectService = subjectService;
        this.gradeService = gradeService;
        this.courseService = courseService;
        this.toaster = toaster;
        this.gradeLabelText = 'Enter obtained marks to calculate grade';
        this.gradeLabelTextClass = "text-info";
        this.formData = new src_app_shared_result_model__WEBPACK_IMPORTED_MODULE_1__["Result"]();
        this.SubjectSelcetValidationMesage = '';
        this.CourseSelcetValidationMesage = '';
        this.StudentSelcetValidationMesage = '';
        this.subscriptions = [];
        this.studentService.refreshList();
        this.subjectService.refreshList();
        this.gradeService.refreshList();
        this.courseService.refreshList();
    }
    ngOnInit() {
        this.subscriptions.push(this.service.formData$.subscribe(data => {
            this.formData = data;
        }), this.service.resetFormData$.subscribe(data => {
            this.resetDataOnDelete(data);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subsription => subsription.unsubscribe());
    }
    onSubmit(form) {
        if (this.isFormInvalid()) {
            this.setValidationMessages();
        }
        else {
            if (this.formData.Id == 0) {
                this.inserRecord(form);
            }
            else {
                this.updateRecord(form);
            }
        }
    }
    isFormInvalid() {
        return this.formData.Course == null
            || this.formData.Student == null
            || this.formData.Subject == null
            || this.formData.Grade == null
            || this.isDuplicateRecord();
    }
    isDuplicateRecord() {
        var _a;
        return ((_a = this.service.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => {
            var _a, _b, _c, _d, _e, _f;
            return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == ((_b = this.formData.Course) === null || _b === void 0 ? void 0 : _b.Id)
                && ((_c = x.Student) === null || _c === void 0 ? void 0 : _c.Id) == ((_d = this.formData.Student) === null || _d === void 0 ? void 0 : _d.Id)
                && ((_e = x.Subject) === null || _e === void 0 ? void 0 : _e.Id) == ((_f = this.formData.Subject) === null || _f === void 0 ? void 0 : _f.Id)
                && this.formData.Id == 0;
        }).length) > 0;
    }
    setValidationMessages() {
        this.SubjectSelcetValidationMesage = this.formData.Subject == null ? ": Required" : '';
        this.CourseSelcetValidationMesage = this.formData.Course == null ? ": Required" : '';
        this.StudentSelcetValidationMesage = this.formData.Student == null ? ": Required" : '';
        if (this.isDuplicateRecord()) {
            this.toaster.error("Result already exists. Use update option", "Error", { closeButton: true });
        }
    }
    populateForm(student) {
        this.formData = Object.assign({}, student);
    }
    calculateGrade() {
        var _a;
        let obMarks = this.formData.ObtainedMarks;
        let course = this.formData.Course;
        if (course == null) {
            this.gradeLabelText = "Select a Course, and a subject first";
            this.gradeLabelTextClass = "text-danger";
            return;
        }
        let grades = (_a = this.gradeService.getList()) === null || _a === void 0 ? void 0 : _a.filter(x => x.Course.Id == course.Id);
        if (grades == null) {
            this.gradeLabelText = "No grades available for the selected subject";
            this.gradeLabelTextClass = "text-info";
            return;
        }
        let grade = grades === null || grades === void 0 ? void 0 : grades.find(x => x.StartingMarks <= obMarks && x.EndingMarks >= obMarks);
        if (grade == null) {
            this.gradeLabelText = "No grade available for given marks range ";
            this.gradeLabelTextClass = "text-info";
            return;
        }
        this.formData.Grade = grade;
        this.gradeLabelText = grade === null || grade === void 0 ? void 0 : grade.Title;
    }
    onCourseSelect(course) {
        var _a, _b;
        this.formData.Course = course;
        this.subjectsInSelectedCourse = (_a = this.subjectService.subjectList) === null || _a === void 0 ? void 0 : _a.filter(x => x.Course.Id == course.Id);
        this.gradesInSelectedCourse = (_b = this.gradeService.getList()) === null || _b === void 0 ? void 0 : _b.filter(x => { var _a; return ((_a = x.Course) === null || _a === void 0 ? void 0 : _a.Id) == course.Id; });
        this.formData.Student = null;
        this.formData.Subject = null;
        this.selectedSubject.value = '';
        this.CourseSelcetValidationMesage = '';
    }
    onStudentSelect(student) {
        this.formData.Student = student;
        this.StudentSelcetValidationMesage = '';
    }
    onSubjectSelect(subject) {
        this.formData.Subject = subject;
        this.studentsInSelectedSubject = this.studentService.studentsList.filter(x => x.Subjects.includes(subject.Id));
        this.SubjectSelcetValidationMesage = '';
    }
    inserRecord(form) {
        this.service.postResult(this.formData).subscribe(result => {
            this.toaster.success('Result added successfully', 'Success', { closeButton: true });
            this.resetForm(form);
            this.service.closeModal();
        }, error => {
            this.toaster.error('An error occured while adding the new result', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    updateRecord(form) {
        this.service.putResult(this.formData).subscribe(result => {
            this.toaster.success('Result updated successfully', 'Success', { closeButton: true });
            this.service.closeModal();
            this.resetForm(form);
        }, error => {
            this.toaster.error('An error occured while updating the new result', 'Error', { closeButton: true });
            console.log(error);
        });
    }
    resetForm(form) {
        form.form.reset();
        this.resetFormData();
    }
    resetFormData() {
        this.gradeLabelText = 'Enter obtained marks to calculate grade';
        this.gradeLabelTextClass = "text-info";
        this.formData = new src_app_shared_result_model__WEBPACK_IMPORTED_MODULE_1__["Result"]();
        this.SubjectSelcetValidationMesage = '';
        this.CourseSelcetValidationMesage = '';
        this.StudentSelcetValidationMesage = '';
    }
    resetDataOnDelete(id) {
        if (id == this.formData.Id || id == -1) {
            this.resetFormData();
        }
    }
}
ResultFormComponent.ɵfac = function ResultFormComponent_Factory(t) { return new (t || ResultFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_result_service__WEBPACK_IMPORTED_MODULE_2__["ResultService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_student_service__WEBPACK_IMPORTED_MODULE_3__["StudentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_grade_service__WEBPACK_IMPORTED_MODULE_5__["GradeService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_6__["CourseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"])); };
ResultFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ResultFormComponent, selectors: [["app-result-form"]], viewQuery: function ResultFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.selectedSubject = _t.first);
    } }, decls: 64, vars: 16, consts: [[1, "row"], ["ngNativeValidate", "", 3, "submit"], ["form", "ngForm"], [1, "col", "col-lg-12"], ["type", "hidden", "name", "id", 3, "value"], [1, "form-group"], [1, "label", "label-default"], [1, "lbl-required"], [1, "label", "label-default", "text-danger"], [1, "dropdown"], ["id", "dropdownMenuButton", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "true", 1, "btn", "btn-secondary", "dropdown-toggle", "drp-dwn"], ["aria-labelledby", "dropdownMenuButton", 1, "dropdown-menu"], ["selectedCourse", ""], ["type", "button", "class", "dropdown-item", 3, "click", 4, "ngFor", "ngForOf"], ["id", "dropdownMenuButton", "data-toggle", "dropdown", 1, "btn", "btn-secondary", "dropdown-toggle", "drp-dwn"], ["selectedSubject", ""], ["selectedStudent", ""], ["type", "number", "min", "0", "max", "100", "placeholder", "Marks", "name", "marks", "required", "", 1, "form-control", "form-control-lg", 3, "ngModel", "change", "ngModelChange"], ["Marks", "ngModel"], [1, "form-group", "col-md-6"], ["type", "button", 1, "btn", "btn-info", "btn-lg", "btn-block", 3, "click"], ["type", "submit", 1, "btn", "btn-info", "btn-lg", "btn-block"], ["type", "button", 1, "dropdown-item", 3, "click"]], template: function ResultFormComponent_Template(rf, ctx) { if (rf & 1) {
        const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function ResultFormComponent_Template_form_submit_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.onSubmit(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, ResultFormComponent_button_17_Template, 2, 1, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Subject");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 11, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, ResultFormComponent_button_30_Template, 2, 1, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Student");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 11, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](43, ResultFormComponent_button_43_Template, 2, 1, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Obtained Marks");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "input", 17, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ResultFormComponent_Template_input_change_49_listener() { return ctx.calculateGrade(); })("ngModelChange", function ResultFormComponent_Template_input_ngModelChange_49_listener($event) { return ctx.formData.ObtainedMarks = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Grade:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResultFormComponent_Template_button_click_59_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2); return ctx.resetForm(_r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.formData.Id);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.CourseSelcetValidationMesage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.formData == null ? null : ctx.formData.Course == null ? null : ctx.formData.Course.Name) ? ctx.formData == null ? null : ctx.formData.Course == null ? null : ctx.formData.Course.Name : "Select Course", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.courseService.getList());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.SubjectSelcetValidationMesage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.formData == null ? null : ctx.formData.Subject == null ? null : ctx.formData.Subject.Name) ? ctx.formData == null ? null : ctx.formData.Subject == null ? null : ctx.formData.Subject.Name : "Select Subject", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.subjectsInSelectedCourse);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.StudentSelcetValidationMesage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (ctx.formData == null ? null : ctx.formData.Student == null ? null : ctx.formData.Student.Name) ? ctx.formData == null ? null : ctx.formData.Student == null ? null : ctx.formData.Student.Name : "Select Student", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.studentsInSelectedSubject);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formData.ObtainedMarks);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("label label-default ", ctx.gradeLabelTextClass, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("(", ctx.gradeLabelText, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.formData.Id != 0 ? "Update" : "Add", " ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"]], styles: [".drp-dwn[_ngcontent-%COMP%] {\r\n    width: 280px;\r\n    max-width: 100%;\r\n    height: 48px;\r\n    max-height: 100%;\r\n}\r\n.lbl-required[_ngcontent-%COMP%] {\r\n    color: red;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC1mb3JtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osZUFBZTtJQUNmLFlBQVk7SUFDWixnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLFVBQVU7QUFDZCIsImZpbGUiOiJyZXN1bHQtZm9ybS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRycC1kd24ge1xyXG4gICAgd2lkdGg6IDI4MHB4O1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgbWF4LWhlaWdodDogMTAwJTtcclxufVxyXG4ubGJsLXJlcXVpcmVkIHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ResultFormComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-result-form',
                templateUrl: './result-form.component.html',
                styleUrls: ['./result-form.component.css']
            }]
    }], function () { return [{ type: src_app_shared_result_service__WEBPACK_IMPORTED_MODULE_2__["ResultService"] }, { type: src_app_shared_student_service__WEBPACK_IMPORTED_MODULE_3__["StudentService"] }, { type: src_app_shared_subject_service__WEBPACK_IMPORTED_MODULE_4__["SubjectService"] }, { type: src_app_shared_grade_service__WEBPACK_IMPORTED_MODULE_5__["GradeService"] }, { type: src_app_shared_course_service__WEBPACK_IMPORTED_MODULE_6__["CourseService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] }]; }, { selectedSubject: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['selectedSubject']
        }] }); })();


/***/ }),

/***/ "uab5":
/*!*****************************************!*\
  !*** ./src/app/shared/grade.service.ts ***!
  \*****************************************/
/*! exports provided: GradeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeService", function() { return GradeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "z9QB");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./splash-screen-state.service */ "C8wY");






class GradeService {
    constructor(http, splashScreenStateService) {
        this.http = http;
        this.splashScreenStateService = splashScreenStateService;
        this.gradeDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.formDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetFormDataUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.closeModalUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.sourceList$ = this.gradeDataUpdatedSource.asObservable();
        this.formData$ = this.formDataUpdatedSource.asObservable();
        this.resetFormData$ = this.resetFormDataUpdatedSource.asObservable();
        this.closeModal$ = this.closeModalUpdatedSource.asObservable();
        this.refreshList();
        setTimeout(() => {
            this.splashScreenStateService.stop();
        }, 1);
    }
    closeModal() {
        this.closeModalUpdatedSource.next(true);
    }
    notifyListUpdate() {
        this.gradeDataUpdatedSource.next(this.gradesList);
    }
    sendFormData(formData) {
        this.formDataUpdatedSource.next(formData);
    }
    resetFormData(id) {
        this.resetFormDataUpdatedSource.next(id);
    }
    postGrade(formData) {
        return this.http.post(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].gradesBase, formData);
    }
    putGrade(formData) {
        return this.http.put(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].gradesBase + '/' + formData.Id, formData);
    }
    deleteGrade(id) {
        return this.http.delete(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].gradesBase + '/' + id);
    }
    refreshList() {
        this.http.get(_Constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].gradesBase)
            .toPromise()
            .then(res => this.gradesList = res)
            .then(x => this.notifyListUpdate());
    }
    getList() {
        return this.gradesList;
    }
}
GradeService.ɵfac = function GradeService_Factory(t) { return new (t || GradeService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__["SplashScreenStateService"])); };
GradeService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GradeService, factory: GradeService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GradeService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }, { type: _splash_screen_state_service__WEBPACK_IMPORTED_MODULE_4__["SplashScreenStateService"] }]; }, null); })();


/***/ }),

/***/ "vQy0":
/*!****************************************!*\
  !*** ./src/app/shared/course.model.ts ***!
  \****************************************/
/*! exports provided: Course */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Course", function() { return Course; });
class Course {
    constructor() {
        this.Id = 0;
        this.Name = '';
        this.Code = '';
        this.TotalCreditHours = 0;
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _student_student_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./student/student.component */ "hLTS");
/* harmony import */ var _teacher_teacher_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./teacher/teacher.component */ "kgOV");
/* harmony import */ var _subject_subject_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subject/subject.component */ "0EBP");
/* harmony import */ var _course_course_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./course/course.component */ "ioW2");
/* harmony import */ var _grade_grade_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./grade/grade.component */ "nA50");
/* harmony import */ var _result_result_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./result/result.component */ "nNT0");










const routes = [
    { path: 'Student', component: _student_student_component__WEBPACK_IMPORTED_MODULE_2__["StudentComponent"] },
    { path: 'Teacher', component: _teacher_teacher_component__WEBPACK_IMPORTED_MODULE_3__["TeacherComponent"] },
    { path: 'Subject', component: _subject_subject_component__WEBPACK_IMPORTED_MODULE_4__["SubjectComponent"] },
    { path: 'Results', component: _result_result_component__WEBPACK_IMPORTED_MODULE_7__["ResultComponent"] },
    { path: 'Course', component: _course_course_component__WEBPACK_IMPORTED_MODULE_5__["CourseComponent"] },
    { path: 'Grade', component: _grade_grade_component__WEBPACK_IMPORTED_MODULE_6__["GradeComponent"] },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "z9QB":
/*!*************************************!*\
  !*** ./src/app/shared/Constants.ts ***!
  \*************************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
class Constants {
}
// ComponentReferences Start
Constants.studentComponentReference = 'studentComponentReference';
Constants.courseComponentReference = 'courseComponentReference';
Constants.subjectComponentReference = 'subjectComponentReference';
Constants.teacherComponentReference = 'teacherComponentReference';
Constants.resultComponentReference = 'resultComponentReference';
Constants.gradeComponentReference = 'gradeComponentReference';
// ComponentReferences End
// Endpoints Start
Constants.coursesBase = '/api/courses';
Constants.subjectsBase = '/api/subjects';
Constants.teachersBase = '/api/teachers';
Constants.studentsBase = '/api/students';
Constants.resultsBase = '/api/results';
Constants.gradesBase = '/api/grades';


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map