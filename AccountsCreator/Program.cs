using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountsCreator
{
    class Program
    {
        static AccountsManager accountsManager = new AccountsManager();
        static void Main(string[] args)
        {
            Console.WriteLine("What's your problem?");
            //AddUser();
            Console.ReadKey();
        }

        static async void AddUser()
        {
            var users = RU_206_Particips.GetLoginPasswordPairsOfParticips();

            //foreach(var userNameAndPassword in users.First())
            //{
            //    var user = await accountsManager.CreateUser(userNameAndPassword.Key, userNameAndPassword.Value);
            //}
            var userNameAndPassword = users.First();
            var userName = userNameAndPassword.Key.Replace("-", string.Empty);
            await accountsManager.CreateUser(userName, userNameAndPassword.Value);
            
            Console.WriteLine("All ok!");
            
        }
    }
}
