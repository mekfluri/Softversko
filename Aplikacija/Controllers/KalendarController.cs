using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]

[Route("/kalendar")]
public class KalendarController : ControllerBase
{
    public IzaberryMeDbContext Context { get; set; }

    private AuthService authService { get; set; }

    public KalendarController(IzaberryMeDbContext context, AuthService authService)
    {
        Context = context;
        this.authService = authService;
    } 

     
     [HttpPost("dodajKalendar/{idstudenta}")]
    public async Task<ActionResult> dodajKomentar(int idstudenta)
    {
         try
        {
          var kalendar = new Kalendar();
          var st = await Context.Studenti.FindAsync(idstudenta);
          kalendar.Student = st!;
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
 
   [HttpGet("vartiKalendar")]
   public async Task<ActionResult> vratiKalendar()
   {
      try{
        var authHeader = Request.Headers["Authorization"].ToString();
        if(string.IsNullOrEmpty(authHeader)){
              return BadRequest("No token provided");
        }
        var token = authHeader.Substring(7);
        var id = authService.GetUserId(token);
        var kal = await Context.Kalendari.Include(p=>p.Student)
                                .Where(p=>p.Student.Id == id)
                                .Include(p=>p.MarkiraniDatumi)
                                
                               
                                .ToListAsync();

         return Ok(kal);
       }
      catch(Exception e)
      {
        return BadRequest(e.Message);
      }
    
                                
   }



}
