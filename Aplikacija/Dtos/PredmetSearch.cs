namespace Dtos;

public class PredmetSearch {
    public string? Naziv { get; set; }
    public Tag? Tag { get; set; }
    public int? Semestar { get; set; }

    public PredmetSearch(string? Naziv, Tag? tag, int? semestar){
        this.Naziv = Naziv;
        this.Tag = tag;
        this.Semestar = semestar;
    }
}