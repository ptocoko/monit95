using System;
using System.Linq;

using Monit95App.Models;
// ReSharper disable CheckNamespace
namespace Monit95App.Web.Services
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext _accountContext;

        public AccountService(ApplicationDbContext accountContext)
        {
            _accountContext = accountContext;
        }

        public AccountModel GetModel(string userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var applicationUser = _accountContext.Users.Find(userId);
            if (applicationUser == null)
            {
                throw new ArgumentException(nameof(userId));
            }

            var applicationUserModel = new AccountModel
            {
                UserName = applicationUser.UserName,
                RoleNames = applicationUser.Roles.Select(x => _accountContext.Roles.Find(x.RoleId).Name)
            };

            return applicationUserModel;
        }
    }
}