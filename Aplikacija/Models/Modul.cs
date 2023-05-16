namespace Models;

public class Modul {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Naziv { get; set; }

    public Modul(){}
    public Modul(string naziv){
        Naziv = naziv;
    }
}