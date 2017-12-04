using Monit95App.Models;
// ReSharper disable CheckNamespace
namespace Monit95App.Web.Services
{
    public interface IAccountService
    {
        AccountModel GetModel(string userId);
    }
}
