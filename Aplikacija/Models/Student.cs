namespace Models;

[Table("Student")]
[PrimaryKey("Id")]
public class Student : RegisterModel {
    [Key]
    public int Id { get; set; }

    public List<Preference> Preference { get; set; }
    public List<Komentar> Komentari { get; set; }
    public Privilegije Privilegije { get; set; }
    public Kalendar Kalendar { get; set; }
    public string Salt { get; set; }

    public Student() {}

    public Student(string username, string email, string password, string salt, string modul, int semestar) 
    :base(username, email, password, modul, semestar){
        Preference = new List<Preference>();
        Komentari = new List<Komentar>();
        Privilegije = Privilegije.PRIV_NONE;
        Kalendar = new Kalendar();
        Salt = salt;
    }
}