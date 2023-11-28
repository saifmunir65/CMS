using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using EnvironmentSetter.Common;

namespace Handlres
{
    static class DatabaseHandler
    {
        static readonly string applicationPoolName = ConfigurationManager.AppSettings[Constants.ApplicationPoolNameKey];
        static readonly string databaseName = ConfigurationManager.AppSettings[Constants.DBNameKey];
        static string query=string.Empty;

        public static void CreateDatabase()
        {
            query = string.Format(Constants.DbCreateQuery, databaseName);

            if (ExecuteQuery(query))
            {
                Console.WriteLine("Database created successfully");
            }
            else
            {
                Console.WriteLine("Unable to create database");
            }
        }

        public static void AddIISAppPoolLogin()
        {
            query = string.Format(Constants.CreateIISApplicationPoolLoginQuery, applicationPoolName, databaseName);

            if (ExecuteQuery(query))
            {
                Console.WriteLine("Application Pool login Created Successfully");
            }
            else
            {
                Console.WriteLine("Unable to create Application Pool login");
            }
        }
        private static bool ExecuteQuery(string query)
        {
            var connection = new SqlConnection(ConfigurationManager.AppSettings[Constants.ConnectionStringKey]);
            var command = new SqlCommand(query, connection);
            var result = false;

            try
            {
                connection.Open();
                command.ExecuteNonQuery();
                result=true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("There was error while executing the SQL", ex.ToString());
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }

            return result;
        }

    }
}
