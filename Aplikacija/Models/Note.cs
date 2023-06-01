namespace Models
{
    [Table("Note")]
    public class Note
    {
        [Key]
        public int Id { get; set; }
    
        

        [Required]
        public Student Student { get; set; }

        [Required]
        public string Text { get; set; }
          
        public bool doneVisible {get;set;}
       

       

        public Note()
        {
            
        }
         public Note(int id,Student student, Mentor mentor,string Text)
        {
            this.Id=id;
            this.Student=student;
            this.Text=Text;
            doneVisible=true;
         
        }

       
    }
}
