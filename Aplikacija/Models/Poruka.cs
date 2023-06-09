namespace Models;

[Table("Poruka")]
public class Poruka
{
    [Key]
    public int Id { get; set; }
    [Required]
    public Student? Student { get; set; }

    public Chat? chat{get;set;}

    [Required]
    public string? Text { get; set; }
    
    public bool procitana{ get; set; }


    public Poruka(){}

    public Poruka(Student student, Chat chat, string text)
    {
        this.Student=student;
        this.chat=chat;
        this.Text=text;
        this.procitana=false;
    }


}