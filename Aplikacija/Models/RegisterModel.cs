using System.Net.Mail;

namespace Models;

public class RegisterModel : LoginModel {
    [Required]
    [Column("username")]
    public string Username { get; set; }
    [Required]
    [Column("modul")]
    public string Modul { get; set; }
    [Required]
    [Column("semestar")]
    public int Semestar { get; set; }

    public RegisterModel() {}

    public RegisterModel(string username, string email, string password, string modul, int semestar): base(email, password){
        try {
            Username = username;
            Modul = modul;
            Semestar = semestar;
        }
        catch(FormatException){
            throw;
        }
    }
}