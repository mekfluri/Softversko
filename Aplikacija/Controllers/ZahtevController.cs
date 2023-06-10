using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Aplikacija.Controllers;


[ApiController]
[Route("/zahtevi")]
public class ZahtevController : ControllerBase
{

    public IzaberryMeDbContext Context { get; set; }
    private FirebaseService firebaseService { get; set; }

    public ZahtevController(IzaberryMeDbContext context, FirebaseService firebaseService)
    {
        Context = context;
        this.firebaseService = firebaseService;
    }

    [HttpGet("mentor/{mentorId}")]
    public async Task<ActionResult> Zahtevi(int mentorId) {
        try {
            var mentor = await Context.Mentori.Include(m => m.Predmeti).Where(m => m.Id == mentorId).FirstOrDefaultAsync();
            if(mentor == null) {
                return NotFound("Mentor nije pronadjen");
            }
            var zahtevi = new List<LiteraturaZahtev>();
            foreach(Predmet p in mentor.Predmeti) {
                var predmetZahtevi = await Context.Zahtevi.Include(z => z.Student).Include(z => z.Predmet).Where(z => z.Predmet!.Id == p.Id).ToListAsync();
                if(predmetZahtevi != null) {
                    zahtevi.AddRange(predmetZahtevi);
                }
            }
            return Ok(zahtevi);
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost("odobri/{zahtevId}/{mentorId}")]
    public async Task<ActionResult> OdobriLiteraturu(int zahtevId, int mentorId){
        try {
            var zahtev = await Context.Zahtevi.Include(z => z.Student).Include(z => z.Predmet).Where(z => z.Id == zahtevId).FirstOrDefaultAsync();
            var mentor = await Context.Mentori.FindAsync(mentorId);
            if(zahtev == null){
                return NotFound("Zahtev nije pronadjen");
            }
            if(mentor == null) {
                return NotFound("Mentor nije pronadjen");
            }
            Literatura literatura = new Literatura(
                0, zahtev.Student!, mentor, zahtev.FileUrl!, zahtev.Predmet!
            );
            literatura.Naziv = zahtev.Naziv;
            Context.Literature.Add(literatura);
            await Context.SaveChangesAsync();
            Context.Zahtevi.Remove(zahtev);
            await Context.SaveChangesAsync();
            return Ok(literatura);
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("odbij/{zahtevId}")]
    public async Task<ActionResult> OdbijLiteraturu(int zahtevId) {
        try {
            var zahtev = Context.Zahtevi.Find(zahtevId);
            if(zahtev == null){
                return NotFound("Zahtev ne postoji");
            }
            Context.Zahtevi.Remove(zahtev);
            await Context.SaveChangesAsync();
            return Ok();
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
    [HttpPost("dodajZahtev/{predmetId}/{userId}")]
    public async Task<ActionResult> dodajZahtev(int predmetId, int userId)
    {
        Student? student = await Context.Studenti.Where(x => x.Id == userId).FirstOrDefaultAsync();
        Predmet? predmet = await Context.Predmeti.Where(x => x.Id == predmetId).FirstOrDefaultAsync();
        if (student == null || predmet == null)
            return BadRequest();
        
        var form = await Request.ReadFormAsync();
        var file = form.Files[0];
        var downloadUrl = await firebaseService.UploadLiteratura(predmetId, userId, file, file.FileName);
        LiteraturaZahtev zahtev = new LiteraturaZahtev(
            student,
            predmet,
            downloadUrl
        );
        zahtev.Naziv = file.FileName;
        Context.Zahtevi.Add(zahtev);
        await Context.SaveChangesAsync();
        return Ok(zahtev);
    }

    [HttpGet("vratiZahteve")]
    public async Task<ActionResult<IEnumerable<LiteraturaZahtev>>> vratiZahteve()
    {
        try
        {
            var zahtevi = await Context.Zahtevi
                .ToListAsync();

            return Ok(zahtevi);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }
    [HttpDelete("ObrisiZahteve/{id}")]
    public async Task<ActionResult<LiteraturaZahtev>> ObrisiZahtev(int id)
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



