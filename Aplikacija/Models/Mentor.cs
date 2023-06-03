namespace Models;

[Table("Mentor")]
public class Mentor : Student
{
    [JsonIgnore]
    public List<Predmet> Predmeti { get; set; }

       [JsonIgnore]
    public List<Zahtev>? Zahtevi { get; set; }

    public Mentor(string username, string email, string password, string salt, Modul modul, int semestar)
    : base(username, email, password, salt, modul, semestar)
    {
        Zahtevi = new List<Zahtev>();
    }

    public Mentor()
    {
        Privilegije = Privilegije.MENTOR;
        Zahtevi = new List<Zahtev>();
    }




}