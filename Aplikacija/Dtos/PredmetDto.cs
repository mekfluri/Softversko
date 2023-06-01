namespace Dtos;

public class PredmetDto {
    public string Naziv { get; set; }
    public Modul Modul { get; set; }
    public int Semestar { get; set; }
    public int ESPB { get; set; }
    public string Opis { get; set; }
    public List<Tag>? Tagovi { get; set; }
    public PredmetDto(){}
    public PredmetDto(string naziv, Modul modul, int semestar, int espb, string opis, List<Tag>? tagovi){
        Naziv = naziv;
        Modul = modul;
        Semestar = semestar;
        ESPB = espb;
        Opis = opis;
        Tagovi = tagovi;
    }
}