using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]

[Route("/kalendar")]
public class KalendarController : ControllerBase
{
    public IzaberryMeDbContext Context { get; set; }

    public KalendarController(IzaberryMeDbContext context)
    {
        Context = context;
    }

     
    [HttpPost("dodajKalendar")]
    public async Task<ActionResult> dodajKomentar([FromBody] Kalendar kalendar)
    {
         try
        {
          Context.Kalendari.Add(kalendar);
          await Context.SaveChangesAsync();
          return Ok("Dodali smo kalendar sa id-jem"+kalendar.Id);
        }
        catch(Exception e)
        {
          return BadRequest(e.Message);
        }
   }

   [HttpDelete("obrisiKalendar/{idkalendara}")]
   public async Task<ActionResult> obrisiKalendar(int idkalendara)
   {
       var k = await Context.Kalendari.FindAsync(idkalendara);
       
       if(k != null)
       {
         Context.Kalendari.Remove(k);
         await Context.SaveChangesAsync();
         return Ok("Obrisali smo kalendar sa rednim brojem" + idkalendara);
       }
       else 
       {
        return BadRequest("Ne postoji takav kalendar");
       }
   }
 
   [HttpGet("vartiKalendar/{idstudenta}")]
   public async Task<ActionResult> vratiKalendar(int idstudenta)
   {
       var kal = await Context.Kalendari.Include(p=>p.Student)
                                .Where(p=>p.Student.Id == idstudenta)
                                .Include(p=>p.MarkiraniDatumi)
                                .Select(p=>new{
                                    p.Id,
                                    p.MarkiraniDatumi
                                }).ToListAsync();

       return Ok(kal);
                                
   }


}
