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

        public async Task CreateUser(string userName, string password)
        {
            if (!String.IsNullOrEmpty(userName) && !String.IsNullOrEmpty(password))
            {
                var user = new ApplicationUser { UserName = userName };
                var result = await UserManager.CreateAsync(user, password);
                if (!result.Succeeded)
                {
                    throw new Exception($"Ошибка при создании пользователя: { AddErrors(result) }");
                }
            }
            else
            {
                throw new ArgumentNullException();
            }
        }

        public async Task CreateRole(string roleName)
        {
            if (String.IsNullOrEmpty(roleName)) throw new ArgumentNullException();

            var role = new IdentityRole { Name = roleName };
            var result = await RoleManager.CreateAsync(role);
            if (!result.Succeeded)
            {
                throw new Exception($"Ошибка при создании роли: { AddErrors(result) }");
            }
        }

        public async Task DeleteRole(string roleName)
        {
            if (String.IsNullOrEmpty(roleName)) throw new ArgumentNullException();

            var role = await RoleManager.FindByNameAsync(roleName);
            var result = await RoleManager.DeleteAsync(role);
            if (!result.Succeeded)
            {
                throw new Exception($"Ошибка при удалении роли: { AddErrors(result) }");
            }
        }

        public async Task AddRoleToUser(string userName, string role)
        {
            if (String.IsNullOrEmpty(userName) || String.IsNullOrEmpty(role)) throw new ArgumentNullException();

            var user = await UserManager.FindByNameAsync(userName);
            var result = await UserManager.AddToRoleAsync(user.Id, role);
            if (!result.Succeeded)
            {
                throw new Exception($"Ошибка при добавлении пользователю роли: { AddErrors(result) }");
            }
        }

        private string AddErrors(IdentityResult result)
        {
            return result.Errors.Aggregate((error1, error2) => $"\n\t{error1} \n\t{error2}");
        }
    }
}
