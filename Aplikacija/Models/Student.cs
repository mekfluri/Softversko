namespace Models;

[Table("Student")]
public class Student : RegisterModel
{
    [Key]
    public int Id { get; set; }

    public List<Preference>? Preference { get; set; }
    [JsonIgnore]
    public List<Komentar>? Komentari { get; set; }

    [JsonIgnore]
    public List<Literatura>? Literatura { get; set; }

    [JsonIgnore]
    public List<Note>? Notes { get; set; }

    public Privilegije Privilegije { get; set; }
    public Kalendar Kalendar { get; set; }
    public string Salt { get; set; }
    public string? Bio{get;set;}

    public Student() { }

    public Student(string username, string email, string password, string salt, Modul modul, int semestar)
    : base(username, email, password, modul, semestar)
    {
        Preference = new List<Preference>();
        Komentari = new List<Komentar>();
        Privilegije = Privilegije.STUDENT;
        Literatura = new List<Literatura>();
        Notes = new List<Note>();
        Kalendar = new Kalendar();
        Salt = salt;
        this.Bio=null;
    }
}