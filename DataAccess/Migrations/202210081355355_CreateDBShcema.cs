namespace DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateDBShcema : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Courses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        TotalCreditHours = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Students",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        RegisterationNumber = c.String(),
                        Birthday = c.DateTime(nullable: false, storeType: "date"),
                        Course_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.Course_Id)
                .Index(t => t.Course_Id);
            
            CreateTable(
                "dbo.Results",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ObtainedMarks = c.Int(nullable: false),
                        Course_Id = c.Int(),
                        Grade_Id = c.Int(),
                        Student_Id = c.Int(),
                        Subject_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.Course_Id)
                .ForeignKey("dbo.Grades", t => t.Grade_Id)
                .ForeignKey("dbo.Students", t => t.Student_Id)
                .ForeignKey("dbo.Subjects", t => t.Subject_Id)
                .Index(t => t.Course_Id)
                .Index(t => t.Grade_Id)
                .Index(t => t.Student_Id)
                .Index(t => t.Subject_Id);
            
            CreateTable(
                "dbo.Grades",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        StartingMarks = c.Int(nullable: false),
                        EndingMarks = c.Int(nullable: false),
                        Course_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.Course_Id)
                .Index(t => t.Course_Id);
            
            CreateTable(
                "dbo.Subjects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        CreditHours = c.Int(nullable: false),
                        Course_Id = c.Int(),
                        Teacher_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.Course_Id)
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id)
                .Index(t => t.Course_Id)
                .Index(t => t.Teacher_Id);
            
            CreateTable(
                "dbo.Teachers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Birthday = c.DateTime(nullable: false, storeType: "date"),
                        Salary = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SubjectStudents",
                c => new
                    {
                        Subject_Id = c.Int(nullable: false),
                        Student_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Subject_Id, t.Student_Id })
                .ForeignKey("dbo.Subjects", t => t.Subject_Id, cascadeDelete: true)
                .ForeignKey("dbo.Students", t => t.Student_Id, cascadeDelete: true)
                .Index(t => t.Subject_Id)
                .Index(t => t.Student_Id);
            
            CreateTable(
                "dbo.TeacherCourses",
                c => new
                    {
                        Teacher_Id = c.Int(nullable: false),
                        Course_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Teacher_Id, t.Course_Id })
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id, cascadeDelete: true)
                .ForeignKey("dbo.Courses", t => t.Course_Id, cascadeDelete: true)
                .Index(t => t.Teacher_Id)
                .Index(t => t.Course_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Results", "Subject_Id", "dbo.Subjects");
            DropForeignKey("dbo.Subjects", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.TeacherCourses", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.TeacherCourses", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.SubjectStudents", "Student_Id", "dbo.Students");
            DropForeignKey("dbo.SubjectStudents", "Subject_Id", "dbo.Subjects");
            DropForeignKey("dbo.Subjects", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.Results", "Student_Id", "dbo.Students");
            DropForeignKey("dbo.Results", "Grade_Id", "dbo.Grades");
            DropForeignKey("dbo.Grades", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.Results", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.Students", "Course_Id", "dbo.Courses");
            DropIndex("dbo.TeacherCourses", new[] { "Course_Id" });
            DropIndex("dbo.TeacherCourses", new[] { "Teacher_Id" });
            DropIndex("dbo.SubjectStudents", new[] { "Student_Id" });
            DropIndex("dbo.SubjectStudents", new[] { "Subject_Id" });
            DropIndex("dbo.Subjects", new[] { "Teacher_Id" });
            DropIndex("dbo.Subjects", new[] { "Course_Id" });
            DropIndex("dbo.Grades", new[] { "Course_Id" });
            DropIndex("dbo.Results", new[] { "Subject_Id" });
            DropIndex("dbo.Results", new[] { "Student_Id" });
            DropIndex("dbo.Results", new[] { "Grade_Id" });
            DropIndex("dbo.Results", new[] { "Course_Id" });
            DropIndex("dbo.Students", new[] { "Course_Id" });
            DropTable("dbo.TeacherCourses");
            DropTable("dbo.SubjectStudents");
            DropTable("dbo.Teachers");
            DropTable("dbo.Subjects");
            DropTable("dbo.Grades");
            DropTable("dbo.Results");
            DropTable("dbo.Students");
            DropTable("dbo.Courses");
        }
    }
}
