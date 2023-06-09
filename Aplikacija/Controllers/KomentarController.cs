using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Authorize]
[Route("/komentar")]
public class KomentarController : ControllerBase
{
    public IzaberryMeDbContext Context { get; set; }

    public KomentarController(IzaberryMeDbContext context)
    {
        Context = context;
    }

    [AllowAnonymous]
    [HttpGet("byStudent/{id}")]
    public async Task<ActionResult> byStudent(int id)
    {
        try
        {
            var student = Context.Studenti.Where(s => s.Id == id).First();
            if (student == null)
            {
                return BadRequest();
            }
            var komentar = await Context.Komentari
            .Include(k => k.Predmet)
            .Where(k => k.Student.Id == id)
            .ToListAsync();
            var komentari = komentar.Select(k => new
            {
                id = k.Id,
                text = k.Text,
                predmet = new
                {
                    id = k.Predmet.Id,
                    naziv = k.Predmet.Naziv
                }
            });

            return Ok(komentari);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("byPredmet/{id}")]
    public async Task<ActionResult> byPredmet(int id)
    {
        try
        {
            var predmet = Context.Predmeti.Where(s => s.Id == id).First();
            if (predmet == null)
            {
                return BadRequest();
            }
            var komentari = await Context.Komentari.Where(k => k.Predmet.Id == id).ToListAsync();
            return Ok(komentari);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }


    [AllowAnonymous]
    [HttpPost("DodajKomentar")]
    public async Task<ActionResult> dodajKomentar([FromBody] KomentarRequest komentarRequest)
    {
        try
        {
            var student = Context.Studenti.Where(s => s.Id == komentarRequest.StudentId).First();
            var predmet = Context.Predmeti.Where(p => p.Id == komentarRequest.PredmetId).First();
            if (student == null || predmet == null)
            {
                return BadRequest();
            }
            var komentar = new Komentar(student, predmet, komentarRequest.Text);
            if (predmet.Komentari == null)
            {
                predmet.Komentari = new List<Komentar>();
            }
            Context.Komentari.Add(komentar);
            await Context.SaveChangesAsync();
            predmet.Komentari.Add(komentar);
            Context.Predmeti.Update(predmet);
            if (student.Komentari == null)
            {
                student.Komentari = new List<Komentar>();
            }
            student.Komentari.Add(komentar);
            Context.Studenti.Update(student);
            await Context.SaveChangesAsync();
            return Ok(new
            {
                id = komentar.Id,
                text = komentar.Text
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("vratiKomentar")]
    public async Task<ActionResult> vratiKomentar()
    {
        try
        {
            var komentar = await Context.Komentari
            .Include(k => k.Student)
            .Include(k => k.Predmet)
            .ToListAsync();
            var komentari = komentar.Select(k => new
            {
                id = k.Id,
                student = k.Student,
                predmet = new
                {
                    id = k.Predmet.Id,
                    naziv = k.Predmet.Naziv
                }
            });

            return Ok(komentari);

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [AllowAnonymous]
    [HttpDelete("obrisiKomentar/{id}")]
    public async Task<ActionResult> obrisiKomentar(int id)
    {

        var k = await Context.Komentari.FindAsync(id);

        if (k != null)
        {
            Context.Komentari.Remove(k);
            await Context.SaveChangesAsync();
            return Ok("Obrisali smo komentar sa rednim brojem" + id);
        }
        else
        {
            return BadRequest("Ne postoji takav komentar");
        }

    }

    [AllowAnonymous]
    [HttpPut("azurirajKomentar/{text}/{idkomentara}")]
    public async Task<ActionResult> azurirajKomentar(string text, int idkomentara)
    {
        var stariKomentar = await Context.Komentari.FindAsync(idkomentara);

        if (stariKomentar != null)
        {
            stariKomentar.Text = text;
            Context.Komentari.Update(stariKomentar);
            await Context.SaveChangesAsync();
            return Ok(stariKomentar);
        }
        else
        {
            return BadRequest("Ne postoji trazeni komentar");
        }
    }










}