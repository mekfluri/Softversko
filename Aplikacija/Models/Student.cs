namespace Models;

[Table("Student")]
public class Student : RegisterModel
{
    [Key]
    public int Id { get; set; }

    public List<Preference>? Preference { get; set; }
    [JsonIgnore]
    public List<Komentar>? Komentari { get; set; }

    public List<Literatura>? Literatura { get; set; }

    [JsonIgnore]
    public List<Note>? Notes { get; set; }

    public string? ProfileImageUrl { get; set; }

    [JsonIgnore]
    public IList<Chat> Chats{get;set;}

    [JsonIgnore]
   

    public Privilegije Privilegije { get; set; }
    public Kalendar Kalendar { get; set; }
    public string Salt { get; set; }
    public string? Bio { get; set; }

    public Student() { }

    public Student(string username, string email, string password, string salt, Modul modul, int semestar)
    : base(username, email, password, modul, semestar)
    {
        Preference = new List<Preference>();
        Komentari = new List<Komentar>();
        Privilegije = Privilegije.STUDENT;
        Literatura = new List<Literatura>();
        Notes = new List<Note>();
        Chats=new List<Chat>();
       
        Kalendar = new Kalendar();
        Salt = salt;
        this.Bio = null;
    }
}