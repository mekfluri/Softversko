namespace Models;

[Table("LiteraturaZahtev")]
public class LiteraturaZahtev
{
    [Key]
    public int Id { get; set; }

    public Student? Student { get; set; }

    public Predmet? Predmet { get; set; }

    public string? FileUrl { get; set; }
    public string Naziv { get; set; }

    public LiteraturaZahtev()
    {
    }

    public LiteraturaZahtev(Student? student, Predmet? predmet, string? fileUrl)
    {
        this.Student = student;
        Predmet = predmet;
        FileUrl = fileUrl;
    }
}