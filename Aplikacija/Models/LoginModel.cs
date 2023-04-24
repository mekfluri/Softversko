using System.Net.Mail;
namespace Models;

public class LoginModel {
    [Column("email")]
    public string Email { get; set; }
    [Column("password")]
    public string Password { get; set; }

    public LoginModel() {}

    public LoginModel(string email, string password) {
        Email = email;
        Password = password;
    }
}