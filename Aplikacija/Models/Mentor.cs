namespace Models;

[Table("Mentor")]
public class Mentor : Student
{
    [JsonIgnore]
    public List<Predmet> Predmeti { get; set; }

    public Mentor(string username, string email, string password, string salt, Modul modul, int semestar)
    : base(username, email, password, salt, modul, semestar)
    {
        Privilegije = Privilegije.MENTOR;
    }

    public Mentor()
    {
        Privilegije = Privilegije.MENTOR;
    }




}