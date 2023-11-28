using System;
using System.Configuration;
using System.Security.Principal;
using EnvironmentSetter.Common;
using Handlres;
using Microsoft.Win32;

namespace EnvironmentSetter
{
    class Program
    {
        static void Main(string[] args)
        {
            ConfigureDevelopmentEnvironment();
        }

        private static void ConfigureDevelopmentEnvironment()
        {
            if (!IsInAdminMode())
            {
                Console.WriteLine("Please run the program as administrator.");
                Console.WriteLine("Right click on icon (Visual Studio or Command Line) and choose 'Run as administrator'");
                Console.WriteLine("Press Any key to exit");
                Console.Read();
                return;
            }

            Console.WriteLine("<<<<Environment Setup Started>>>>\n");
            CompleteConfigurationSteps();
            Console.WriteLine("\n<<<<Environment Setup Completed Successfully>>>>\n\n Press any key to exit");
            Console.ReadKey();
        }

        private static void CompleteConfigurationSteps()
        {
            var steps = ConfigurationManager.AppSettings[Constants.ConfigurationStepsKey].Split(',');
            foreach (var step in steps)
            {
                if (int.TryParse(step, out var castedValue))
                {
                    PerformConfiguration(castedValue);
                }
                else
                {
                    Console.WriteLine("Invalid character" + step +
                                      " in app.config against key <ConfigurationSteps>: Please provide a valid step number between  1 to 6\n");
                    PrintStepDescription();
                }
            }
        }

        static void PerformConfiguration(int step)
        {
            switch (step)
            {
                case 1:
                    Console.WriteLine("Step 1 started");
                    Console.WriteLine("Activating necessary windows features for the IIS");
                    EnableWindowsFeatures();
                    Console.WriteLine("Step 1  Ended\n\n");
                    break;
                case 2:
                    Console.WriteLine("Step 2 started");
                    Console.WriteLine("Creating DB");
                
                    if (IsSQLServerInstalled())
                    {
                        CreateDatabase();
                        Console.WriteLine("Step 2 Ended\n\n");
                    }
                    else
                    {
                        Console.WriteLine("Can't create DB, as SQL Server is not installed on this machine. Please install SQL Server and run the program again");
                    }
                    break;
                case 3:
                    Console.WriteLine("Step 3 started");
                    Console.WriteLine("Creating IIS Application");
                    CreateIISApplication();
                    Console.WriteLine("IIS Application created successfully");
                    Console.WriteLine("Step 3 Ended\n\n");
                    break;
                case 4:
                    Console.WriteLine("Step 4 started");
                    Console.WriteLine("Logging entry for the site in host file");
                    CreateHostFileEntry();
                    Console.WriteLine("Logged entry for the site in host file successfully");
                    Console.WriteLine("Step 4 Ended\n\n");
                    break;
                case 5:
                    Console.WriteLine("Step 5 started");
                    Console.WriteLine("Creating IIS Identity Pool login in sql server");

                    if (IsSQLServerInstalled())
                    {
                        CreateIISLoginOnSqlServer();
                        Console.WriteLine("Created IIS Identity Pool login in sql server successfully");
                        Console.WriteLine("Step 5 Ended\n\n");
                    }
                    else
                    {
                        Console.WriteLine("Can't create IIS Identity Pool login in SQL Server as SQL Server is not installed on this machine. Please install it first and run the program again");
                    }
                    break;
                case 6:
                    Console.WriteLine("Step 6 started");
                    Console.WriteLine("Launching Website");
                    LaunchWebsite();
                    Console.WriteLine("Launched Website");
                    Console.WriteLine("Step 6 Ended");
                    break;
                default:
                    Console.WriteLine("Invalid step number " + step + " in app.config against key <ConfigurationSteps>: Please provide a valid step number between  1 to 6\n");
                    PrintStepDescription();
                    break;
            }

        }

        static void PrintStepDescription()
        {
            Console.WriteLine("1: Windows features activation for the IIS\n" +
                              "2: Creating the DB\n" +
                              "3: Creating application on IIS\n" +
                              "4: Modifying host file in driver / etc / hosts\n" +
                              "5: Creating a user login on SQL server, to allo IIS app pool, login into DB using Windows Authentication\n" +
                              "6: Launching the configured website\n");
        }
       
        static bool IsInAdminMode()
        {
            return (new WindowsPrincipal(WindowsIdentity.GetCurrent()))
                .IsInRole(WindowsBuiltInRole.Administrator);
        }
        static bool IsSQLServerInstalled()
        {
            return Registry.LocalMachine.OpenSubKey(Constants.SQLServerRegKey) != null;
        }
        static void EnableWindowsFeatures()
        {
            WindowsFeaturesHandler.EnableFeatures();
        }
        static void CreateDatabase()
        {
            DatabaseHandler.CreateDatabase();
        }

        static void CreateIISApplication()
        {
            IISHandler.CreateIISApplication();
        }

        static void CreateHostFileEntry()
        {
            HostHandler.CreateHostFileEntry();
        }

        static void CreateIISLoginOnSqlServer()
        {
            DatabaseHandler.AddIISAppPoolLogin();
        }

        static void LaunchWebsite()
        {
            System.Diagnostics.Process.Start("http://" + ConfigurationManager.AppSettings[Constants.HostNameKey]);
        }

    }
}
