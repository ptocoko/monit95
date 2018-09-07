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
            Console.InputEncoding = Encoding.Unicode;
            Console.OutputEncoding = Encoding.Unicode;
            //var cokoLoginPasswords = new Dictionary<string, string>
            //{
            //    ["201_coko"] = "558388",
            //    ["202_coko"] = "893359",
            //    ["203_coko"] = "431823",
            //    ["204_coko"] = "778470",
            //    ["205_coko"] = "801371",
            //    ["206_coko"] = "932094",
            //    ["207_coko"] = "925165",
            //    ["208_coko"] = "923895",
            //    ["209_coko"] = "283077",
            //    ["210_coko"] = "541156",
            //    ["211_coko"] = "656253",
            //    ["212_coko"] = "496098",
            //    ["213_coko"] = "749483",
            //    ["214_coko"] = "140348",
            //    ["215_coko"] = "820615",
            //    ["216_coko"] = "699368",
            //    ["217_coko"] = "175814"

            //};
            //Console.WriteLine("here we go!");
            //foreach (var logingPair in CHOU_accounts.Get())
            //{
            //    Console.WriteLine($"user {logingPair.Key} creating...");
            //    accountsManager.CreateUser(logingPair.Key, logingPair.Value);
            //    accountsManager.AddRoleToUser(logingPair.Key, "school");
            //    Console.WriteLine($"user {logingPair.Key} created!");
            //}
            bool toExit = false;
            while (!toExit)
            {
                Console.Write("Введите команду -> ");
                var command = Console.ReadLine();

                switch (command.Trim().ToUpper())
                {
                    case "EXIT":
                        toExit = true;
                        break;
                    case "CREATE USER":
                        AddUser();
                        break;
                    case "DELETE USER":
                        DeleteUser();
                        break;
                    case "CREATE ROLE":
                        AddRole();
                        break;
                    case "DELETE ROLE":
                        DeleteRole();
                        break;
                    case "ADD ROLE TO USER":
                        AddRoleToUser();
                        break;
                    case "CHANGE PASSWORD":
                        ChangePassword();
                        break;
                    case "CLEAR":
                        Console.Clear();
                        break;
                    case "HELP":
                        ShowAllCommands();
                        break;
                    default:
                        Console.WriteLine($"Команда '{command}' не найдена. Для помощи воспользуйтесь командой 'help'\n");
                        break;
                }
            }
        }

        private static void AddUser()
        {
            string firstPassword;
            string secondPassword;
            Console.Write("\nВведите логин: ");
            var userName = Console.ReadLine().Trim();

            a:
            Console.Write("\nВведите пароль: ");
            firstPassword = GetPasswordFromConsole();
            Console.Write("\nВведите пароль повторно: ");
            secondPassword = GetPasswordFromConsole();

            if (String.Equals(firstPassword, secondPassword, StringComparison.InvariantCulture))
            {
                try
                {
                    accountsManager.CreateUser(userName, firstPassword);
                    Console.WriteLine("\nПользователь успешно добавлен!\n");
                }
                catch(IdentityException ex)
                {
                    Console.WriteLine($"\n{ex.Message}\n");
                    Main(null);
                }
            }
            else
            {
                Console.WriteLine("\nПароли не совпадают!");
                goto a;
            }
        }

        private static void DeleteUser()
        {
            Console.Write("\nВведите логин удаляемого пользователя: ");
            var userName = Console.ReadLine().Trim();
            try
            {
                accountsManager.DeleteUser(userName);
                Console.WriteLine("\nПользователь успешно удален!\n");
            }
            catch(IdentityException ex)
            {
                Console.WriteLine($"\n{ex.Message}\n");
                Main(null);
            }
        }

        private static void AddRole()
        {
            Console.WriteLine("\nВведите название роли:");
            var roleName = Console.ReadLine();
            try
            {
                accountsManager.CreateRole(roleName);
                Console.WriteLine("\nРоль успешно создана!\n");
            }
            catch (IdentityException ex)
            {
                Console.WriteLine($"\n{ex.Message}\n");
                Main(null);
            }
        }

        private static void DeleteRole()
        {
            Console.WriteLine("\nВведите название удаляемой роли: ");
            var roleName = Console.ReadLine();
            try
            {
                accountsManager.DeleteRole(roleName);
                Console.WriteLine("\nРоль успешно удалена!\n");
            }
            catch(IdentityException ex)
            {
                Console.WriteLine($"\n{ex.Message}\n");
                Main(null);
            }
        }

        private static void AddRoleToUser()
        {
            Console.WriteLine("\nВведите название роли: ");
            var roleName = Console.ReadLine();

            Console.WriteLine("\nВведите логин пользователя: ");
            var userName = Console.ReadLine();
            try
            {
                accountsManager.AddRoleToUser(userName, roleName);
                Console.WriteLine($"\nПользователю {userName} добавлена роль {roleName}!");
            }
            catch(IdentityException ex)
            {
                Console.WriteLine($"\n{ex.Message}\n");
                Main(null);
            }
        }

        private static void ChangePassword()
        {
            Console.WriteLine("\nВведите логин пользователя: ");
            var userName = Console.ReadLine();

            Console.WriteLine("\nВведите настоящий пароль: ");
            var currentPassword = Console.ReadLine();

            Console.WriteLine("\nВведите новый пароль: ");
            var newPassword = Console.ReadLine();

            try
            {
                accountsManager.ChangePassword(userName, currentPassword, newPassword);
                Console.WriteLine($"\nПароль пользователя {userName} успешно заменен!");
            }
            catch(IdentityException ex)
            {
                Console.WriteLine($"\n{ex.Message}\n");
                Main(null);
            }
        }

        private static void ShowAllCommands()
        {
            Console.WriteLine( $"\nСписок команд:\n\ncreate user -> Создать пользователя;\n\rdelete user -> Удалить пользователя;\n\rchange password -> Изменить пароль пользователя;\ncreate role -> Создать роль;\ndelete role -> Удалить роль;\nadd role to user -> Добавить пользователю роль\nclear -> Очистить консоль;\n");
        }

        private static string GetPasswordFromConsole()
        {
            StringBuilder sb = new StringBuilder();
            ConsoleKeyInfo key;
            while ((key = Console.ReadKey(true)).Key != ConsoleKey.Enter)
            {
                if (key.Key != ConsoleKey.Backspace)
                {
                    sb.Append(key.KeyChar);
                }
                else
                {
                    sb.Length--;
                }
            }
            return sb.ToString();
        }

        static void AddRU_206_Particips()
        {
            var users = Ru206Particips.GetLoginPasswordPairsOfParticips();

            foreach (var userNameAndPassword in users)
            {
                accountsManager.CreateUser(userNameAndPassword.Key, userNameAndPassword.Value);
            }

            Console.WriteLine("All ok!");
            
        }
    }
}
