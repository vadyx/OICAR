using System;
using System.Linq;
using WebServis.Models.Registration;

namespace WebServis.Services
{
    public interface IUserService
    {
        RegisteredUser getCurrentUser(string Username);
    }
    public class UserService : IUserService
    {
        private RegisteredUserModel db_registeredUserModel = new RegisteredUserModel();
        public RegisteredUser getCurrentUser(string Username)
        {
            return db_registeredUserModel.RegisteredUsers.Where(user => user.LoginCredentials.Username == Username).Single();
        }
    }
}