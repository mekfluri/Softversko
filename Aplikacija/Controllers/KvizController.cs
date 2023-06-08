using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
        Dictionary<int, MutableTuple<Predmet, int>> results = new Dictionary<int, MutableTuple<Predmet,int>>();
        int compatabilityScore = 0;
        foreach (Preference preferenca in user.Preference)
        {
            foreach (Predmet predmet in preferenca.Tag.Predmeti)
            {
                compatabilityScore = 0;
                foreach (Tag t in predmet.Tagovi)
                {
                    if (preferenca.Tag.Id == t.Id)
                    {
                        compatabilityScore += preferenca.Ocena;
                    }
                }
                if (!results.ContainsKey(predmet.Id))
                {
                    results.Add(predmet.Id, new MutableTuple<Predmet, int>(predmet, compatabilityScore));
                }
                else
                {
                    results[predmet.Id].Second += compatabilityScore;
                }
            }
        }
        return Ok(results.OrderByDescending(kvp => kvp.Value.Second));
    }

}