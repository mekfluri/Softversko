using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[Authorize]
[ApiController]
[Route("/mentorRequest")]

public class MentorRequestController : ControllerBase{

    public IzaberryMeDbContext dbContext { get; set; }
    private AuthService authService { get; set; }
    private FirebaseService firebaseService { get; set; }

    public MentorRequestController(IzaberryMeDbContext context, AuthService authService, FirebaseService firebaseService)
    {
        dbContext = context;
        this.firebaseService = firebaseService;
        this.authService = authService;
    }

    [HttpGet("all")]
    public async Task<ActionResult> GetAll() {
        return Ok(await dbContext.MentorZahtevi.ToListAsync());
    }

    [HttpPost("{userId}/{predmetId}")]
    public async Task<ActionResult> AddRequest(int userId, int predmetId) {
        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }
        try {
            var student = await dbContext.Studenti.FindAsync(userId);
            var predmet = await dbContext.Predmeti.FindAsync(predmetId);
            if(student == null || predmet == null) {
                return BadRequest();
            }
            var form = await Request.ReadFormAsync();
            var file1 = form.Files[0];
            var file2 = form.Files[1];

            var urls = await firebaseService.UploadMentorRequestPhotos(predmet.Id, student.Id, file1, file2);
            var mentorRequest = new MentorRequest {
                IndeksPhoto = urls[0],
                PredmetPhoto = urls[1],
                Student = student,
                Predmet = predmet
            };

            dbContext.MentorZahtevi.Add(mentorRequest);
            await dbContext.SaveChangesAsync();
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
        return Ok();
    }

}