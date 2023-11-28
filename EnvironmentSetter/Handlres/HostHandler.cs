using System;
using System.Configuration;
using System.IO;
using EnvironmentSetter.Common;

namespace Handlres
{
    static class HostHandler
    {
        public static void CreateHostFileEntry()
        {
            string localHostIp = ConfigurationManager.AppSettings[Constants.LocalHostIpKey];
            string hostName = ConfigurationManager.AppSettings[Constants.HostNameKey];
            string hostAndIp = localHostIp + " " + hostName;
            
            if (AddEntryToHostFile(hostAndIp))
            {
                Console.WriteLine("Host File modified successfully");
            }
        }

        private static bool AddEntryToHostFile(string entry)
        {

            try
            {
                if (IsEntryExists(entry))
                {
                    Console.WriteLine("Host file is already modified, skipping this part.");
                    return false;
                }
                using (StreamWriter streamWriter = File.AppendText(Constants.HostFilePath))
                {
                    streamWriter.WriteLine(entry);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An exception occurred while modifying host file. Exception:" + ex.Message);
                return false;
            }
        }

        private static bool IsEntryExists(string entry)
        {

            var isMatch = false;
            using (StreamReader streamReader = File.OpenText(Constants.HostFilePath))
            {
               var lines = File.ReadAllLines(Constants.HostFilePath);

                for (var counter = 0; counter < lines.Length - 1; counter++)
                {
                    if (entry == lines[counter])
                    {
                        streamReader.Close();
                        isMatch = true;
                    }
                }
                if (!isMatch)
                {
                    streamReader.Close();
                }
            }

            return isMatch;
        }
    }
}
