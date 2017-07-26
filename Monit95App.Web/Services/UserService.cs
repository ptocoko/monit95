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
#warning fix after update identity
            //var user = _accountContext.Users.Find(userId);
            //var model = new UserModel
            //{
            //    UserName = user.UserName,
            //    UserRoleNames = user.Roles.Select(x => x.Role.Name)
            //};

            //return model;
            return null;
        }
    }
}