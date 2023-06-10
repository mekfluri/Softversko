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

    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult> Kviz([FromBody] Preference[] preference)
    {
        try
        {
            Dictionary<int, MutableTuple<Predmet, int>> results = new Dictionary<int, MutableTuple<Predmet, int>>();
            int compatabilityScore = 0;
            var tagovi = new List<Tag>();
            foreach (Preference preferenca in preference)
            {
                var tag = await dbContext.Tagovi.Where(t => t.Naziv == preferenca.Tag.Naziv).Include(t => t.Predmeti).ThenInclude(p => p.Tagovi).FirstOrDefaultAsync();
                if (tag == null) continue;
                foreach (Predmet p in tag.Predmeti)
                {
                    compatabilityScore = 0;
                    foreach (Tag t in p.Tagovi)
                    {
                        if (preferenca.Tag.Id == t.Id)
                        {
                            compatabilityScore += preferenca.Ocena;
                        }
                    }
                    if (!results.ContainsKey(p.Id))
                    {
                        results.Add(p.Id, new MutableTuple<Predmet, int>(p, compatabilityScore));
                    }
                    else
                    {
                        results[p.Id].Second += compatabilityScore;
                    }
                }
            }
            return Ok(results.OrderByDescending(kvp => kvp.Value.Second));
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
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
        Dictionary<int, MutableTuple<Predmet, int>> results = new Dictionary<int, MutableTuple<Predmet, int>>();
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