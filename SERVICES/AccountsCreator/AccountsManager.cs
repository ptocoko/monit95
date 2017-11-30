using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountsCreator
{
    public class AccountsManager
    {
        public UserManager<ApplicationUser> UserManager { get; private set; } = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
        public RoleManager<IdentityRole> RoleManager { get; private set; } = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

        public AccountsManager()
        {
            UserManager.UserValidator = new UserValidator<ApplicationUser>(UserManager)
            {
                AllowOnlyAlphanumericUserNames = false
            };
        }

        public void CreateUser(string userName, string password)
        {
            if (!String.IsNullOrEmpty(userName) && !String.IsNullOrEmpty(password))
            {
                var user = new ApplicationUser { UserName = userName };
                var result = UserManager.Create(user, password);
                if (!result.Succeeded)
                {
                    throw new IdentityException($"Ошибка при создании пользователя: { AddErrors(result) }");
                }
            }
            else
            {
                throw new ArgumentNullException();
            }
        }

        public void DeleteUser(string userName)
        {
            var user = UserManager.FindByName(userName);
            var result = UserManager.Delete(user);
            if (!result.Succeeded)
            {
                throw new IdentityException($"Ошибка при удалении пользователя: { AddErrors(result) }");
            }
        }

        public void CreateRole(string roleName)
        {
            if (String.IsNullOrEmpty(roleName)) throw new ArgumentNullException();

            var role = new IdentityRole { Name = roleName };
            var result = RoleManager.Create(role);
            if (!result.Succeeded)
            {
                throw new IdentityException($"Ошибка при создании роли: { AddErrors(result) }");
            }
        }

        public void DeleteRole(string roleName)
        {
            if (String.IsNullOrEmpty(roleName)) throw new ArgumentNullException();

            var role = RoleManager.FindByName(roleName);
            var result = RoleManager.Delete(role);
            if (!result.Succeeded)
            {
                throw new IdentityException($"Ошибка при удалении роли: { AddErrors(result) }");
            }
        }

        public void AddRoleToUser(string userName, string roleName)
        {
            if (String.IsNullOrEmpty(userName) || String.IsNullOrEmpty(roleName)) throw new ArgumentNullException();

            var user = UserManager.FindByName(userName);
            var result = UserManager.AddToRole(user.Id, roleName);
            if (!result.Succeeded)
            {
                throw new IdentityException($"Ошибка при добавлении пользователю роли: { AddErrors(result) }");
            }
        }

        public void ChangePassword(string userName, string currentPassword, string newPassword)
        {
            if (String.IsNullOrEmpty(userName) || String.IsNullOrEmpty(currentPassword) || String.IsNullOrEmpty(newPassword)) throw new ArgumentNullException();

            var user = UserManager.FindByName(userName);
            var result = UserManager.ChangePassword(user.Id, currentPassword, newPassword);
            if (!result.Succeeded)
            {
                throw new IdentityException($"Ошибка при изменении пароля пользователя: { AddErrors(result) }");
            }
        }
        
        private string AddErrors(IdentityResult result)
        {
            return result.Errors.Aggregate((error1, error2) => $"\n\t{error1} \n\t{error2}");
        }
    }
}
