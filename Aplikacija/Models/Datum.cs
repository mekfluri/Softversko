namespace Models;

public class Datum {
    [Key]
    public int Id { get; set; }
    public string Poruka { get; set; }
    public DateTime OznacenDatum { get; set; }
    [JsonIgnore]
    public Kalendar kalendar { get; set; }


    public Datum() {}
}