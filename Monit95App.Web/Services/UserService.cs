using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Monit95App.Models;

namespace Monit95App.Web.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _accountContext;

        public UserService(ApplicationDbContext accountContext)
        {
            _accountContext = accountContext;
        }

        public UserModel GetModel(string userId)
        {            
            var applicationUser = _accountContext.Users.Find(userId);
            var applicationUserModel = new UserModel
            {
                UserName = applicationUser.UserName,
                UserRoleNames = applicationUser.Roles.Select(x => _accountContext.Roles.Find(x.RoleId).Name)
            };

            return applicationUserModel;
        }
    }
}