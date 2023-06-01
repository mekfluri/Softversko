namespace Models;

[Table("Administrator")]
public class Admin : Mentor
{

    public Admin(string username, string email, string password, string salt, Modul modul, int semestar)
    : base(username, email, password, salt, modul, semestar)
    {
        Privilegije = Privilegije.ADMIN;
    }
    public Admin()
    {
        this.Privilegije = Privilegije.ADMIN;
    }
}