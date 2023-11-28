using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using EnvironmentSetter.Common;
using Microsoft.Dism;

namespace Handlres
{
    static class WindowsFeaturesHandler
    {
        private static readonly string[] features = ConfigurationManager
            .AppSettings[Constants.IISFeaturesToActivateKey]
            .Replace(" ",string.Empty)
            .Replace("\r", string.Empty)
            .Replace("\n", string.Empty)
            .Replace("\t", string.Empty)
            .Split(',');

        public static void EnableFeatures()
        {
            var installedFeatures = GetInstalledFeatures();
            Console.WriteLine("\n Activating features not activated previously ");
            foreach (var feature in features)
            {
                if (!installedFeatures.Contains(feature))
                {
                    EnableFeature(feature);
                }
                else
                {
                    Console.WriteLine(feature+" already activated. Skipping it.");
                }
            }
        }

        private static IEnumerable<string> GetInstalledFeatures()
        {
            var installedFeatures = new List<string>();
            DismApi.Initialize(DismLogLevel.LogErrorsWarningsInfo);
            Console.WriteLine("Checking already activated features");
            try
            {
                using (var session = DismApi.OpenOnlineSessionEx(new DismSessionOptions() { }))
                {
                    var features = DismApi.GetFeatures(session);

                    foreach (var feature in features)
                    {
                        if (feature.State == DismPackageFeatureState.Installed)
                            installedFeatures.Add(feature.FeatureName);
                    }
                }
            }
            finally
            {
                DismApi.Shutdown();
            }

            return installedFeatures;
        }

        private static void EnableFeature(string featureName)
        {
            Console.WriteLine("Activating feature "+featureName+"\nProgress:");
            DismApi.Initialize(DismLogLevel.LogErrorsWarningsInfo);
            try
            {
                using (var session = DismApi.OpenOnlineSession())
                {
                    DismApi.EnableFeature(session, featureName, false, true, null, progress =>
                    {
                        Console.SetCursorPosition(Console.CursorLeft, Console.CursorTop);
                        Console.Write($"{progress.Current}/{progress.Total}");
                    });
                    Console.WriteLine();
                }
            }
            finally
            {
                DismApi.Shutdown();
            }
        }
    }
}