namespace Models;

[Table("Tagovi")]
public class Tag {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Naziv {get; set; }
    [JsonIgnore]
    public List<Predmet>? Predmeti { get; set; }
    [JsonIgnore]
    public List<Preference>? Preference { get; set; }

    public Tag() {}
    public Tag(int id, string naziv){
        Id = id;
        Naziv = naziv;
    }

    public Tag(string naziv){
        Naziv = naziv;
    }
}