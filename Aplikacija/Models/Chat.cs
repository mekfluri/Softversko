namespace Models;

[Table("Chat")]
public class Chat
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int StudentPosiljaocId { get; set; }

    [Required]
    public int StudentPrimaocId { get; set; }

    [JsonIgnore]
    public IList<Poruka> Poruke { get; set; }

    [ForeignKey("StudentPosiljaocId")]
    public Student StudentPosiljaoc { get; set; }

    [ForeignKey("StudentPrimaocId")]
    public Student StudentPrimaoc { get; set; }

    public Chat()
    {
        Poruke = new List<Poruka>();
    }

    public Chat(Student studentPrim, Student studentPos)
    {
        this.StudentPosiljaoc = studentPos;
        this.StudentPrimaoc = studentPrim;
        Poruke = new List<Poruka>();
    }
}
