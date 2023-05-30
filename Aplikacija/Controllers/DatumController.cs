using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/datum")]
public class DatumController : ControllerBase
{
      public IzaberryMeDbContext Context { get; set; }
      
       private AuthService authService { get; set; }

    public DatumController(IzaberryMeDbContext context,AuthService authService)
    {
        Context = context;
        this.authService = authService;
    }
   
    [HttpPost("dodajdatum/{poruka}/{oznacenDatum}")]
   public async Task<ActionResult> dodajDatum(string poruka,DateTime oznacenDatum)
    {

         try
        {
          var authHeader = Request.Headers["Authorization"].ToString();
          if(string.IsNullOrEmpty(authHeader)){
            return BadRequest("No token provided");
          }
          var token = authHeader.Substring(7);
          var id = authService.GetUserId(token);


          var k = await Context.Kalendari.Where(p=> p.Student.Id == id).FirstAsync();

         if(k != null)
         {
         
          
          Datum d = new Datum();
          d.OznacenDatum = oznacenDatum;
          d.Poruka = poruka;
          d.kalendar = k; 
          
          Context.Datumi.Add(d);
         
         
          await Context.SaveChangesAsync();
          return Ok(d.Id);
         }
         else
         {
          return BadRequest("ne postoji odredjeni kalendar");
         }
           
          
        }
        catch(Exception e)
        {
          return BadRequest(e.Message);
        }
   }

   [HttpDelete("obrisiDatum/{iddatuma}")]
   public async Task<ActionResult> obrisiDatum(int iddatuma)
   {

      try 
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
      catch(Exception e)
      {
         return BadRequest(e.Message);
      }
   }

   [HttpPost("dodajdatumkrozbody")]
   public async Task<ActionResult> dodajdatumkrozbody([FromBody] Datum datum)
   {
       try
    {
        
        Context.Datumi!.Add(datum);
        await Context.SaveChangesAsync();
        return Ok("Dodali smo datum sa id-jem"+datum.Id);
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
   }


   
}
