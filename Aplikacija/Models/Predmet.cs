namespace Models;

[Table("Predmeti")]
public class Predmet {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Naziv { get; set; }

    public Modul? Modul { get; set; }
    [Required]
    public int Semestar { get; set; }
    public List<Ocena>? Ocene { get; set; }
    public List<Tag>? Tagovi { get; set; }
    public List<Komentar>? Komentari { get; set; }
    [Required]
    public int ESPB { get; set; }
    [Required]
    public string Opis { get; set; }

    public Predmet() {}
    public Predmet(string naziv, Modul modul, int semestar, List<Ocena>? ocene, List<Tag>? tagovi, int espb, string opis){
        Naziv = naziv;
        Modul = modul;
        Semestar = semestar;
        Ocene = ocene;
        Tagovi = tagovi;
        ESPB = espb;
        Opis = opis;
    }

}