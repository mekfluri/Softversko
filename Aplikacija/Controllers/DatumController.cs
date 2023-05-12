using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/datum")]
public class DatumController : ControllerBase
{
      public IzaberryMeDbContext Context { get; set; }

    public DatumController(IzaberryMeDbContext context)
    {
        Context = context;
    }
   
   [HttpPost("dodajdatum")]
   public async Task<ActionResult> dodajDatum([FromBody] Datum datum)
    {
         try
        {
          Context.Datumi.Add(datum);
          await Context.SaveChangesAsync();
          return Ok("Dodali smo datum sa id-jem"+datum.Id);
        }
        catch(Exception e)
        {
          return BadRequest(e.Message);
        }
   }

   [HttpDelete("obrisiDatum/{iddatuma}")]
   public async Task<ActionResult> obrisiDatum(int iddatuma)
   {
       var k = await Context.Datumi.FindAsync(iddatuma);
       
       if(k != null)
       {
         Context.Datumi.Remove(k);
         await Context.SaveChangesAsync();
         return Ok("Obrisali smo  datum sa rednim brojem" + iddatuma);
       }
       else 
       {
        return BadRequest("Ne postoji takav datum");
       }
   }

   
}
