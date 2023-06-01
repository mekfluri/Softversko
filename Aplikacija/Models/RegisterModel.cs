using System.Net.Mail;

namespace Models;

public class RegisterModel : LoginModel {

    [Column("username")]
    public string Username { get; set; }

    [Column("modul")]
    public Modul? Modul { get; set; }

    [Column("semestar")]
    public int Semestar { get; set; }

    public RegisterModel() {}

    public RegisterModel(string username, string email, string password, Modul modul, int semestar): base(email, password){
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