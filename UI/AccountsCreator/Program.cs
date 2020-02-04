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

            accountsManager.ChangePassword("0425", "password99", "6tVKmwnEr4");
            //accountsManager.CreateUser("0624", "LbInICaTeRon");
            //accountsManager.AddRoleToUser("0624", "school");

            //foreach (var schoolId in new string[] { "0001", "0002", "0005", "0010", "0011", "0012", "0014", "0015", "0016", "0019", "0020", "0021", "0024", "0025", "0026", "0027", "0028", "0029", "0038", "0041", "0042", "0043", "0044", "0045", "0047", "0048", "0049", "0050", "0051", "0052", "0054", "0055", "0056", "0057", "0058", "0059", "0060", "0063", "0066", "0067", "0068", "0069", "0070", "0074", "0075", "0076", "0078", "0081", "0086", "0087", "0088", "0089", "0090", "0106", "0127", "0129", "0130", "0132", "0133", "0134", "0135", "0138", "0139", "0140", "0141", "0142", "0143", "0144", "0145", "0146", "0147", "0148", "0149", "0150", "0151", "0152", "0153", "0154", "0155", "0156", "0157", "0158", "0159", "0160", "0161", "0162", "0163", "0164", "0165", "0166", "0167", "0169", "0170", "0171", "0172", "0173", "0174", "0175", "0176", "0177", "0178", "0179", "0180", "0181", "0183", "0184", "0185", "0186", "0187", "0188", "0189", "0190", "0191", "0192", "0193", "0194", "0196", "0197", "0198", "0199", "0201", "0202", "0203", "0204", "0205", "0206", "0207", "0208", "0209", "0210", "0211", "0212", "0213", "0214", "0215", "0216", "0217", "0218", "0219", "0221", "0222", "0223", "0224", "0225", "0226", "0227", "0228", "0229", "0230", "0231", "0232", "0233", "0234", "0235", "0236", "0237", "0238", "0239", "0240", "0241", "0242", "0243", "0244", "0245", "0246", "0247", "0248", "0251", "0252", "0253", "0254", "0255", "0256", "0257", "0258", "0259", "0260", "0261", "0262", "0263", "0264", "0265", "0266", "0267", "0268", "0269", "0270", "0272", "0273", "0276", "0277", "0278", "0279", "0280", "0281", "0282", "0283", "0284", "0285", "0286", "0287", "0288", "0289", "0290", "0291", "0292", "0293", "0294", "0295", "0296", "0297", "0298", "0299", "0300", "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0311", "0312", "0313", "0314", "0315", "0316", "0317", "0318", "0319", "0320", "0321", "0322", "0323", "0324", "0325", "0328", "0329", "0331", "0332", "0333", "0335", "0336", "0337", "0338", "0339", "0340", "0341", "0343", "0344", "0345", "0346", "0347", "0348", "0349", "0350", "0352", "0353", "0355", "0356", "0357", "0358", "0359", "0360", "0361", "0362", "0363", "0364", "0365", "0366", "0367", "0368", "0369", "0370", "0371", "0372", "0373", "0374", "0375", "0376", "0377", "0378", "0379", "0380", "0381", "0382", "0383", "0384", "0385", "0386", "0390", "0391", "0392", "0393", "0394", "0395", "0396", "0397", "0398", "0399", "0400", "0401", "0402", "0403", "0404", "0405", "0406", "0408", "0409", "0410", "0411", "0412", "0413", "0414", "0415", "0416", "0417", "0419", "0420", "0422", "0424", "0425", "0426", "0427", "0428", "0430", "0431", "0432", "0435", "0436", "0437", "0438", "0439", "0440", "0441", "0442", "0443", "0444", "0445", "0446", "0448", "0449", "0451", "0453", "0455", "0456", "0458", "0459", "0460", "0462", "0463", "0464", "0465", "0466", "0467", "0469", "0487", "0495", "0520", "0552", "0553", "0554", "0555", "0556", "0557", "0558", "0560", "0561", "0562", "0565", "0566", "0580", "0583", "0588", "0617", "0593" })
            //{
            //    accountsManager.AddRoleToUser(schoolId, "i-take-ege");
            //}

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
            //bool toExit = false;
            //while (!toExit)
            //{
            //    Console.Write("Введите команду -> ");
            //    var command = Console.ReadLine();

            //    switch (command.Trim().ToUpper())
            //    {
            //        case "EXIT":
            //            toExit = true;
            //            break;
            //        case "CREATE USER":
            //            AddUser();
            //            break;
            //        case "DELETE USER":
            //            DeleteUser();
            //            break;
            //        case "CREATE ROLE":
            //            AddRole();
            //            break;
            //        case "DELETE ROLE":
            //            DeleteRole();
            //            break;
            //        case "ADD ROLE TO USER":
            //            AddRoleToUser();
            //            break;
            //        case "CHANGE PASSWORD":
            //            ChangePassword();
            //            break;
            //        case "CLEAR":
            //            Console.Clear();
            //            break;
            //        case "HELP":
            //            ShowAllCommands();
            //            break;
            //        default:
            //            Console.WriteLine($"Команда '{command}' не найдена. Для помощи воспользуйтесь командой 'help'\n");
            //            break;
            //    }
            //}
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
