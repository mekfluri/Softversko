namespace Models;

[Table("MentorRequests")]
public class MentorRequest {
    [Key]
    public int Id { get; set; }
    public Student Student { get; set; }
    public Predmet Predmet { get; set; }
    public string IndeksPhoto { get; set; }
    public string PredmetPhoto { get; set; }

    public MentorRequest() {}
}