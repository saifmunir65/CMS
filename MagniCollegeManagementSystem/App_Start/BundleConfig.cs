using System.Web.Optimization;
using MagniCollegeManagementSystem.Common;

namespace MagniCollegeManagementSystem.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle(Constants.ScriptBundleKeys.Popper).Include(
                "~/Scripts/popper.min.js"));

            bundles.Add(new ScriptBundle(Constants.ScriptBundleKeys.Angular).Include(
                "~/Scripts/Client/runtime.js",
                "~/Scripts/Client/polyfills.js",
                "~/Scripts/Client/vendor.js",
                "~/Scripts/Client/main.js"));

            bundles.Add(new ScriptBundle(Constants.ScriptBundleKeys.Jquery).Include(
                "~/Scripts/jquery-3.4.1.slim.min.js",
                "~/Scripts/jquery-3.3.1.min.js"));

            bundles.Add(new ScriptBundle(Constants.ScriptBundleKeys.Bootstrap).Include(
                "~/Scripts/bootstrap.min.js"));

            bundles.Add(new StyleBundle(Constants.StyleBundleKeys.Bootstrap).Include(
                "~/Content/bootstrap.min.css"));

            bundles.Add(new ScriptBundle(Constants.ScriptBundleKeys.SignalR).Include(
                    "~/Scripts/jquery.signalR-2.4.0.min.js",
                    "~/Scripts/magni-signalr-listener.js"));

            bundles.Add(new StyleBundle(Constants.StyleBundleKeys.Site).Include(
                "~/Content/site.v1.css",
                "~/Content/toaster.css"));
        }
    }
}