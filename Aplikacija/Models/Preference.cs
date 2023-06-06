namespace Models;

public class Preference {
    [Key]
    public int Id{get; set;}
    [Required]
    public Tag Tag {get; set;}
    [Required]
    public int Ocena {get; set;}

    [JsonIgnore]
    public Student? Student { get; set; }
    public Preference() {}
    public Preference(Tag tag, int ocena){
        Tag = tag;
        Ocena = ocena;
    }

}