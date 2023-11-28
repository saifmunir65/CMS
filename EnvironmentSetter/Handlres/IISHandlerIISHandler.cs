using System;
using System.Configuration;
using System.Linq;
using EnvironmentSetter.Common;
using Microsoft.Web.Administration;

namespace Handlres
{
    static class IISHandler
    {
        public static void CreateIISApplication()
        {
            string applicationPoolName = ConfigurationManager.AppSettings[Constants.ApplicationPoolNameKey];
            string webAppName = ConfigurationManager.AppSettings[Constants.WebApplicationNameKey];
            string physcialPath = AppDomain.CurrentDomain.BaseDirectory + "..\\..\\..\\" + webAppName;
            string siteName = ConfigurationManager.AppSettings[Constants.SiteNameInIISKey];
            string host = ConfigurationManager.AppSettings[Constants.HostNameKey];
            string bindingProtocol = ConfigurationManager.AppSettings[Constants.BindingProtocolKey];
            string ipAddress = ConfigurationManager.AppSettings[Constants.IPAddressKey];
            string port = ConfigurationManager.AppSettings[Constants.PortKey];
            string bindingInformation = ipAddress + ":"+port+ ":"+ host;
            string traceFailedRequestsLoggingDirectory = "C:\\inetpub\\" + siteName + "\\site";
            const string pathToDelete = "EnvironmentSetter\\bin\\Debug\\..\\..\\..\\";

            try
            {
                ServerManager serverMgr = new ServerManager();
                physcialPath = physcialPath.Replace(pathToDelete, string.Empty);

                if (serverMgr.ApplicationPools.FirstOrDefault(x => x.Name.Equals(applicationPoolName)) == null)
                {
                    ApplicationPool pool = serverMgr.ApplicationPools.Add(applicationPoolName);
                    serverMgr.CommitChanges();
                    Console.WriteLine("Pool Added Successfully");
                }
                else
                {
                    Console.WriteLine("Application pool already exists. Skipping this part");
                }

                if (serverMgr.Sites.FirstOrDefault(x => x.Name.Equals(siteName)) == null)
                {
                    var site = serverMgr.Sites.Add(siteName, bindingProtocol, bindingInformation, physcialPath);
                    site.ApplicationDefaults.ApplicationPoolName = applicationPoolName;
                    site.TraceFailedRequestsLogging.Enabled = true;
                    site.TraceFailedRequestsLogging.Directory = traceFailedRequestsLoggingDirectory;
                    serverMgr.CommitChanges();
                    Console.WriteLine("Site Added Successfully");
                }
                else
                {
                    Console.WriteLine("Site already exist. Skipping this part");
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine("Error occurred while adding the site. Error:\n" + exception.Message);
            }
        }
    }
}