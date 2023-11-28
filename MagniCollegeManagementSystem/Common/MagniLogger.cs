using System.Configuration;
using NLog;

namespace MagniCollegeManagementSystem.Common
{
    public class MagniLogger:IMagniLogger
    {
        private readonly Logger _logger;
        private readonly string logLevel;

        public MagniLogger()
        {
            _logger = LogManager.GetLogger(ConfigurationManager.AppSettings.Get(Constants.LoggerNameKey));
            logLevel = ConfigurationManager.AppSettings.Get(Constants.LogLevelKey);
        }
        
        public void Info(string message)
        {
            if (logLevel.ToLower().Contains(Constants.LogLevelAll.ToLower()) 
                || logLevel.ToLower().Contains(Constants.LogLevelInfoOnly.ToLower()))
            {
                _logger.Info(message);
            }
        }

        public void Error(string message)
        {
            if (logLevel.ToLower().Contains(Constants.LogLevelAll.ToLower()) 
                || logLevel.ToLower().Contains(Constants.LogLevelErrorsOnly.ToLower()))
            {
                _logger.Error(message);
            }
        }
    }
}