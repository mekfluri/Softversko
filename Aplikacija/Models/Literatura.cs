namespace Models
{
    [Table("Literatura")]
    public class Literatura
    {
        [Key]
        public int Id { get; set; }

        [JsonIgnore]
        public Student? Student { get; set; }
        [JsonIgnore]

        public Mentor? Mentor { get; set; }

        [Required]
        public string filePath { get; set; }
        public string Naziv { get; set; }

        [JsonIgnore]
        public Predmet? Predmet { get; set; }

        public Literatura()
        {

        }
        public Literatura(int id, Student student, Mentor mentor, string filePath, Predmet predmet)
        {
            this.Id = id;
            this.Student = student;
            this.Mentor = mentor;
            this.filePath = filePath;
            this.Predmet = predmet;
        }


    }
}
