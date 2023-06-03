using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Aplikacija.Controllers;


[ApiController]
[Authorize]
[Route("/zahtevi")]
public class ZahtevController : ControllerBase
{

    public IzaberryMeDbContext Context { get; set; }

    public ZahtevController(IzaberryMeDbContext context)
    {
        Context = context;
    }

    [HttpPost("dodajZahtev/{literaturaID}")]
    public async Task<ActionResult> dodajZahtev(int literaturaID)
    {
        Literatura literatura = await Context.Literature!.Where(x => x.Id == literaturaID).FirstOrDefaultAsync();
        if (literatura == null)
            return BadRequest("");
        Zahtev zahtev = new Zahtev();
        zahtev.Literatura = literatura;

        try
        {
            JsonSerializerOptions options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            Context.Zahtevi.Add(zahtev);
            await Context.SaveChangesAsync();

            string serializedZahtev = JsonSerializer.Serialize(zahtev, options);
            return Ok(serializedZahtev);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    [HttpGet("vratiZahteve")]
    public async Task<ActionResult<IEnumerable<Zahtev>>> vratiZahteve()
    {
        try
        {
            var zahtevi = await Context.Zahtevi
                .Include(x => x.Literatura)
                .ThenInclude(x => x.Student)
                .ToListAsync();

            return Ok(zahtevi);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

}
