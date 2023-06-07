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
        Literatura literatura = await Context.Literature.FindAsync(literaturaID);
        if (literatura == null)
            return NotFound("Ne postoji ova literatura");

        Zahtev zahtev = new Zahtev();
        zahtev.Literatura = literatura;

        try
        {
            Context.Zahtevi.Add(zahtev);
            await Context.SaveChangesAsync();

            return Ok(zahtev);
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
    [HttpDelete("ObrisiZahteve/{id}")]
    public async Task<ActionResult<Zahtev>> ObrisiZahtev(int id)
    {
        try
        {
            var tag = await Context.Zahtevi.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (tag == null)
            {
                return BadRequest("Ne postoji zahtev sa zadatim identifikatorom");
            }
            Context.Zahtevi.Remove(tag);
            await Context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
    [HttpPut("izmeniZahtev/{id}")]
    public async Task<ActionResult> IzmeniZahtev(int id)
    {
        try
        {
            var zahtev = await Context.Zahtevi.Where(z => z.Id == id).FirstOrDefaultAsync();
            if (zahtev == null)
            {
                return NotFound("Ne postoji zahtev sa zadatim identifikatorom");
            }

            zahtev.Odobren = true;

            Context.Zahtevi.Update(zahtev);
            await Context.SaveChangesAsync();

            return Ok(zahtev);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}



