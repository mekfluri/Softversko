namespace Models;

[Table("Zahtev")]
public class Zahtev
{
    [Key]
    public int Id { get; set; }


    public Mentor? Mentor { get; set; }

    public Literatura Literatura { get; set; }

    public bool Odobren { get; set; }
    public Zahtev()
    {
        this.Odobren = false;
    }

    public Zahtev(Literatura literatura)
    {
       
        this.Literatura = literatura;
        this.Odobren = false;
    }


}