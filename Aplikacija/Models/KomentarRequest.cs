namespace Models;

public class KomentarRequest {
    public int StudentId { get; set; }
    public int PredmetId { get; set; }
    public string Text { get; set; }

    public KomentarRequest(){}
    public KomentarRequest(int studentId, int predmetId, string text){
        StudentId = studentId;
        PredmetId = predmetId;
        Text = text;
    }
}