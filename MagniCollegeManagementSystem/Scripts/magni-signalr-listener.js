$(function () {

    var magniSyncHub = $.connection.magniSyncHub;
    var client = magniSyncHub.client;

    client.studentsUpdated = function () {
        window.studentComponentReference.zone.run(() => {
            window.studentComponentReference.syncData();
        });
    };

    client.coursesUpdated = function () {
        window.courseComponentReference.zone.run(() => {
            window.courseComponentReference.syncData();
        });
    };

    client.subjectsUpdated = function () {
        window.subjectComponentReference.zone.run(() => {
            window.subjectComponentReference.syncData();
        });
    };

    client.teachersUpdated = function () {
        window.teacherComponentReference.zone.run(() => {
            window.teacherComponentReference.syncData();
        });
    };

    client.resultsUpdated = function () {
        window.resultComponentReference.zone.run(() => {
            window.resultComponentReference.syncData();
        });
    };

    client.gradesUpdated = function () {
        window.gradeComponentReference.zone.run(() => {
            window.gradeComponentReference.syncData();
        });
    };

    $.connection.hub.start().done();

});