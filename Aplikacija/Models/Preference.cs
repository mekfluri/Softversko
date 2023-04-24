namespace Models;

public class Preference {
    [Key]
    public int Id{get; set;}
    [Required]
    public Tag Tag {get; set;}
    [Required]
    public Ocena Ocena {get; set;}
    public Preference() {}
    public Preference(Tag tag, Ocena ocena){
        Tag = tag;
        Ocena = ocena;
    }

}