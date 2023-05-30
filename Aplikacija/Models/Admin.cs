namespace Models;

[Table("Administrator")]
public class Admin : Mentor {

    public Admin() {
        Privilegije = Privilegije.ADMIN;
    }
}