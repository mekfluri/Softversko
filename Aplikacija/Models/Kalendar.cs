namespace Models;

[Table("Kalendari")]
public class Kalendar {
    [Key]
    public int Id {get; set;}
    [Required]
    public Student? Student { get; set; }
    public List<Datum>? MarkiraniDatumi { get; set; }

    public Kalendar() {
        Student = null;
        MarkiraniDatumi = null;
    }

    public Kalendar(Student student) {
        Student = student;
        MarkiraniDatumi = new List<Datum>();
    }
}