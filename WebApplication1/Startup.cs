using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Monit95App.Startup))]
namespace Monit95App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
