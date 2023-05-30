namespace Models
{
    [Table("Literatura")]
    public class Literatura
    {
        [Key]
        public int Id { get; set; }
    
        public Student? Student { get; set; }

        public Mentor? Mentor { get; set; }

        [Required]
        public string filePath { get; set; }

        public Literatura()
        {
            
        }
         public Literatura(int id,Student student, Mentor mentor,string filePath)
        {
            this.Id=id;
            this.Student=student;
            this.Mentor=mentor;
            this.filePath=filePath;
        }

       
    }
}
