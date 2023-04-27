using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Authorize]
[Route("/komentar")]
public class KomentarContorller : ControllerBase{
    public IzaberryMeDbContext Context { get; set; }

    public KomentarContorller(IzaberryMeDbContext context)
    {
        Context = context;
    }

    [AllowAnonymous]
    [HttpPost("DodajKomentar")]
    public async Task<ActionResult> dodajKomentar([FromBody] Komentar komentar)
    {
    try
    {
        Context.Komentari.Add(komentar);
        await Context.SaveChangesAsync();
        return Ok("Dodali smo komentar sa id-jem"+komentar.Id);
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