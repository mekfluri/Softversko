using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/mentor")]

public class MentorController : ControllerBase
{

    public IzaberryMeDbContext Context { get; set; }
    private AuthService authService { get; set; }

    public MentorController(IzaberryMeDbContext context, AuthService authService)
    {
        Context = context;
        this.authService = authService;
    }

    [HttpPost("DodajMentora")]
    public async Task<ActionResult> dodajMentora([FromBody] Mentor mentor)
    {
        try
        {
            Context.Mentori!.Add(mentor);
            await Context.SaveChangesAsync();
            return Ok("Dodali smo mentora sa id-jem" + mentor.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("vratiMentore")]
    public async Task<ActionResult> vratiMentore()
    {
        try
        {
            return Ok(await Context.Mentori!.ToListAsync());

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet]
    public async Task<ActionResult> vratiMentora()
    {
        try
        {
            var id = authService.GetUserId(Request);
            if (id == -1)
            {
                return BadRequest("Invalid token");
            }
            var mentor = await Context.Mentori.Where((mentor) => mentor.Id == id)
              .Include((mentor) => mentor.Preference)
              .FirstOrDefaultAsync();
            if (mentor == null)
            {
                return NotFound("Mentor ne postoji");
            }
            return Ok(new
            {
                username = mentor.Username,
                id = mentor.Id,
                modul = mentor.Modul,
                semestar = mentor.Semestar,
                email = mentor.Email
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("obrisiMentora/{id}")]
    public async Task<ActionResult> obrisiMentora(int id)
    {

        var p = await Context.Mentori!.FindAsync(id);


        if (p != null)
        {
            Context.Mentori.Remove(p);
            await Context.SaveChangesAsync();
            return Ok("Obrisali smo mentora sa rednim brojem" + id);
        }
        else
        {
            return BadRequest("ne postoji trazeni predmet");
        }

    }

    [HttpPut("azurirajMentora/{idmentora}")]
    public async Task<ActionResult> azurirajMentora([FromBody] Mentor mentor, int idmentora)
    {
        var stariMentor = await Context.Mentori.FindAsync(idmentora);

        if (stariMentor != null)
        {
            stariMentor.Username = mentor.Username;
            stariMentor.Password = mentor.Password;
            stariMentor.Email = mentor.Email;
            stariMentor.Kalendar = mentor.Kalendar;
            stariMentor.Komentari = mentor.Komentari;
            stariMentor.Modul = mentor.Modul;
            stariMentor.Preference = mentor.Preference;
            stariMentor.Privilegije = mentor.Privilegije;
            stariMentor.Salt = mentor.Salt;
            stariMentor.Semestar = mentor.Semestar;
            stariMentor.Predmeti = mentor.Predmeti;
            stariMentor.Literatura = mentor.Literatura;

            Context.Mentori.Update(stariMentor);
            await Context.SaveChangesAsync();
            return Ok(stariMentor);
        }
        else
        {
            return BadRequest("ne postoji takav mentor");
        }

    }









}