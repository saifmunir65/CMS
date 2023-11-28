using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MagniCollegeManagementSystem.Common
{
    public static class Constants
    {
        public const string SeedCheckKey="IsSeedNeeded";
        public const string LoggerNameKey = "LoggerName";
        public const string LogLevelKey = "LoggerLevel";

        public const string LogLevelAll = "All";
        public const string LogLevelErrorsOnly = "Error";
        public const string LogLevelInfoOnly = "Info";
        public static class ScriptBundleKeys
        {
            public const string Jquery = "~/bundles/jquery";
            public const string SignalR = "~/bundles/signalr";
            public const string Bootstrap = "~/bundles/bootstrap";
            public const string Angular = "~/bundles/angular";
            public const string Popper = "~/bundles/popper";
        }
        public static class StyleBundleKeys
        {
            public const string Bootstrap = "~/content/bootstrap";
            public const string Site = "~/content/site";
        }
    }
}