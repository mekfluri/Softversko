using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Authorize]
[Route("/komentar")]
public class KomentarController : ControllerBase{
    public IzaberryMeDbContext Context { get; set; }

    public KomentarController(IzaberryMeDbContext context)
    {
        Context = context;
    }

    [AllowAnonymous]
    [HttpGet("byStudent/{id}")]
    public async Task<ActionResult> byStudent(int id){
        try {
            var student = Context.Studenti.Where(s => s.Id == id).First();
            if(student == null){
                return BadRequest();
            }
            var komentari = await Context.Komentari.Where(k => k.Student.Id == id).FirstAsync();
            return Ok(komentari);
        }
        catch(Exception ex){
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
        if(student == null || predmet == null){
            return BadRequest();
        }
        var komentar = new Komentar(student, predmet, komentarRequest.Text);
        if(predmet.Komentari == null){
            predmet.Komentari = new List<Komentar>();
        }
        predmet.Komentari.Add(komentar);
        Context.Predmeti.Update(predmet);
        Context.Komentari.Add(komentar);
        await Context.SaveChangesAsync();
        return Ok(new {
            id = komentar.Id,
            text = komentar.Text
        });
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
   }

   [AllowAnonymous]
   [HttpGet("vratiKomentar")]
   public async Task<ActionResult> vratiKomentar()
   {
    try{
        return Ok(await Context.Komentari.ToListAsync());
    
    }
    catch(Exception e)
    {
      return BadRequest(e.Message);
    }
  
   }

   [AllowAnonymous]
   [HttpDelete("obrisiKomentar/{id}")]
   public async Task<ActionResult> obrisiKomentar(int id)
   {
       
       var k = await Context.Komentari.FindAsync(id);
       
       if(k != null)
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

       if(stariKomentar != null)
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