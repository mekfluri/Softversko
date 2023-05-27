namespace Models;

[Table("Komentari")]
public class Komentar {
    [Key]
    public int Id { get; set; }
    [Required]
    public Student Student { get; set; }
    [Required]
    [JsonIgnore]
    public Predmet Predmet { get; set; }
    [Required]
    public string Text { get; set; }

    public Komentar() {
        
    }
    public Komentar(Student student, Predmet predmet, string text){
        Student = student;
        Predmet = predmet;
        Text = text;
    }

}