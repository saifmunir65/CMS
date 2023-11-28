using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MagniCollegeManagementSystem.Startup))]
namespace MagniCollegeManagementSystem
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
