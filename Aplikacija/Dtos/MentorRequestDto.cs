namespace Dtos;

public class MentorRequestDto {
    public int StudentId { get; set; }
    public int PredmetId { get; set; }
    public IFormFile FirstPage { get; set; }
    public IFormFile PredmetPage { get; set; }
}