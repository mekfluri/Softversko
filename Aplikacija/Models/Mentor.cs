namespace Models;

[Table("Mentor")]
public class Mentor : Student
{
  

    [JsonIgnore]
    public List<Literatura> Literatura { get; set; }

    [JsonIgnore]
    public List<Predmet> Predmeti { get; set; }

    
    public Mentor(){
        Privilegije = Privilegije.MENTOR;
    }
    
   


}