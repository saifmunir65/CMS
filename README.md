# MagniCMS
A college management system, providing  basic functionality for these modules: 

* Student
* Teacher
* Course
* Subject 
* Result 
* Grade

All modules have CRUD fucntionalites avaialble. 

# Technologies and Frameworks

* .Net Standard
* ASP.Net MVC 5
* Angular Js 
* Type Script
* Java Script 
* Signal R
* Entity Framework 
* SQL Server

# Runtime dependencies
* .Net (Standard) Framework  (Runtime) 4.7.2
Link: https://dotnet.microsoft.com/en-us/download/dotnet-framework/net472 
* SQL Server (2014 onwards)
Link: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
* Windows environment

# Development dependencies
* .Net (Standard) Framework  (Developer Pack) 4.7.2
Link: https://dotnet.microsoft.com/en-us/download/dotnet-framework/net472 
* Node JS v 16.17.0  Link:https://nodejs.org/en/download/releases/
* Angular cli "~11.0.2" Command: npm install -g @angular/cli@11.0.2
    
# Setup guidelines (To only run the project):
Method 1 (In Visual Studio):
1) Install these dependencies:
    <br/>a. SQL Server
    <br/>b. Visual Studio
    <br/>d. .Net Framework
    <br/>d. Any browser
    
2) Open the project in Visual Studio
3) Build the solution and let the NueGt restore the packages
4) Set "MagniCollegeManagementSystem" as the startup project and run the solution
5) Application will run after setting up the DB and seed data
    
Method 2 (On IIS):
1) Install these dependencies:
    <br/>a. SQL Server
    <br/>b. Visual Studio
    <br/>c. .Net Framework
    <br/>d. Any browser
    
2) Open the project in Visual Studio (Must be opened as Administrator)
3) Build the main solution and let the Nuget restore the packages
4) Set "EnvironmentSetter" as startup project and run the solution
5) The program will take care of setting up everything and it will launch applicatoin in the browser

# Setup guidelines (To contribute as a developer):

1) Install these dependencies:
    <br/>a. SQL Server
    <br/>b. Visual Studio
    <br/>c. Any browser
    <br/>d. .Net Framework
    <br/>e. Node Js
    <br/>f. Angular CLI

2) Open the project in Visual Studio
3) Build the solution and let the NuGet restore the packages.
4) Run npm instal command in  "MagniCollegeManagementSystem\Client"
4) For .Net side development, explore the project "MagniCollegeManagementSystem" except the folder 'Client'
5) For Angular side development, explore the folder 'Client' in "MagniCollegeManagementSystem" web project. This folder has all code related to Angular applciation

# Projects
* <b>  BusinessLogic:</b>
<br> Responsible for:
<br> a: Adding business logic (If any)

* <b>  UnitTests:</b>
<br> Responsible for:
<br> a: Containing unit tests for the proejcts

* <b>  DataAccess:</b>
<br> Responsible for:
<br> a: Creating the DB at first run
<br> b: Adding seed data
<br> c: Performing DB operations
<br> d: Providing abstration around DB operations


 * <b> EnvironmentSetter:</b>
<br> Responsible for setting environment to run application on IIS by
<br> a: Activating windows features required for the IIS
<br> b: Creating applicaiotn pool and applicaiton in IIS
<br> c: Creating DB in SQL server and assigning  DB access rights to IIS pool login
<br> d: Running application

* <b>  MagniCollegeManagementSystem:</b>
<br> Conatains web application including
<br> a: Routing logic
<br> b: Views
<br> c: Angular code
<br> d: ASP.NET code

# How overall application works:
The application makes use of ASP.NET MVC 5 and Angular architecture.

When angular application is built, it's generated output files are placed inside "Script" folder in MVC project.

When MVC project runs, it launches it's index view.  

Inside index view "app-root" component (Basic building block of angular application)is rendered, which makes Angular application run inside the MVC view.

Every time, application starts, it doest start the Angular application along. 

(Will be updated furhter..)
