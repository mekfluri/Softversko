using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[Authorize]
[ApiController]
[Route("/kviz")]

public class KvizController : ControllerBase
{

    public IzaberryMeDbContext dbContext { get; set; }
    private AuthService authService { get; set; }

    public KvizController(IzaberryMeDbContext context, AuthService authService)
    {
        dbContext = context;
        this.authService = authService;
    }

    [HttpGet("byPreferences")]
    public async Task<ActionResult> ByPreference()
    {
        var userId = authService.GetUserId(Request);
        if (userId == -1)
        {
            return BadRequest("Invalid token!");
        }
        var user = await dbContext.Studenti
        .Include(s => s.Preference!)
        .ThenInclude(p => p.Tag)
        .ThenInclude(t => t.Predmeti)
        .Where(s => s.Id == userId)
        .FirstOrDefaultAsync();
        var predmeti = new List<Predmet>();
        List<Tuple<Predmet, int>> scores = new List<Tuple<Predmet, int>>();
        int score = 0;
        foreach (Preference preferenca in user.Preference)
        {
            foreach (Predmet predmet in preferenca.Tag.Predmeti)
            {
                score = 0;
                predmeti.Add(predmet);
                foreach (Tag t in predmet.Tagovi)
                {
                    var pref = user.Preference.Select(pref => pref.Tag.Id == t.Id ? pref : null).First();
                    if(pref != null) {
                        score += pref.Ocena;
                    }
                }
                scores.Add(new Tuple<Predmet, int>(predmet, score));
            }
        }
        return Ok(scores);
    }

}