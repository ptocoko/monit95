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

        private static void ShowAllCommands()
        {
            Console.WriteLine( $"\nСписок команд:\n\ncreate user -> Создать пользователя;\n\rdelete user -> Удалить пользователя;\ncreate role -> Создать роль;\ndelete role -> Удалить роль;\nadd role to user -> Добавить пользователю роль\nclear -> Очистить консоль;\n");
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
            var users = RU_206_Particips.GetLoginPasswordPairsOfParticips();

            foreach (var userNameAndPassword in users)
            {
                accountsManager.CreateUser(userNameAndPassword.Key, userNameAndPassword.Value);
            }

            Console.WriteLine("All ok!");
            
        }
    }
}
