namespace Models;

[Table("Ocene")]
public class Ocena {
    [Key]
    public int Id {get; set; }
    public int DostupnostMaterijala {get; set; }
    public int AngazovanjeProfesora { get; set; }
    public int LaboratorijskeVezbe { get; set; }
    public int TezinaPredmeta { get; set; }
    public int PrakticnoZnanje { get; set; }

    

}