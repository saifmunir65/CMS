using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnvironmentSetter.Common
{
   public static class Constants
   {
       //Queries Start
       public static readonly string CreateIISApplicationPoolLoginQuery = "IF SUSER_ID (N'IIS APPPOOL\\{0}') IS NULL BEGIN " +
                                                                       "CREATE LOGIN[IIS APPPOOL\\{0}] FROM WINDOWS; END  " +
                                                                       "exec sp_defaultdb @loginame = 'IIS APPPOOL\\{0}',@defdb = '{1}'; " +
                                                                       "USE[{1}] " +
                                                                       "EXEC sp_changedbowner 'IIS APPPOOL\\{0}'";
       public static readonly string DbCreateQuery = "IF NOT EXISTS(SELECT* FROM sys.databases " +
                                                     "WHERE name =  '{0}' ) BEGIN CREATE DATABASE {0} ; END";
        //Queries End
        //Misc Start
        public static readonly string HostFilePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.System), @"drivers\etc\hosts");
        public static readonly string SQLServerRegKey = @"SOFTWARE\MICROSOFT\Microsoft SQL Server";
        //Misc End
        //Config Keys Start
        public static readonly string LocalHostIpKey = "LocalHostIp";
        public static readonly string HostNameKey = "HostName";
        public static readonly string DBNameKey = "DBName";
        public static readonly string ApplicationPoolNameKey = "ApplicationPoolName";
        public static readonly string WebApplicationNameKey = "WebApplicationName";
        public static readonly string ConnectionStringKey = "ConnectionString";
        public static readonly string SiteNameInIISKey = "SiteNameInIIS";
        public static readonly string IISFeaturesToActivateKey = "IISFeaturesToActivate";
        public static readonly string PortKey = "Port";
        public static readonly string BindingProtocolKey = "BindingProtocol";
        public static readonly string IPAddressKey = "IPAddress";
        public static readonly string ConfigurationStepsKey = "ConfigurationSteps";
        //Config Keys End
    }
}
