using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]

[Route("/ocena")]

public class OcenaController : ControllerBase{
    public IzaberryMeDbContext Context { get; set; }

    public OcenaController(IzaberryMeDbContext context)
    {
        Context = context;
    }

    [HttpPost("dodajOcenu")]
    public async Task<ActionResult> dodajOcenu([FromBody] Ocena ocena)
   {
    try
    {
        Context.Ocene!.Add(ocena);
        await Context.SaveChangesAsync();
        return Ok("Dodali smo ocenu sa id-jem"+ocena.Id);
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
   }

   [HttpDelete("obrisiOcenu/{id}")]
   public async Task<ActionResult> obrisiOcenu(int id)
   {
       
        var p = await Context.Ocene!.FindAsync(id);
       
       if(p!= null)
       {
        Context.Ocene.Remove(p);
         await Context.SaveChangesAsync();
         return Ok("Obrisali smo premet sa rednim brojem" + id);
       }
       else
       {
        return BadRequest("ne postoji trazeni predmet");
       }
      
   }

   [HttpPut("azurirajOcenu/{idocene}")]
   public async Task<ActionResult> azurirajOcenu([FromBody] Ocena ocena, int idocene)
   {
     var staraOcena = await Context.Ocene.FindAsync(idocene);

     if(staraOcena != null)
     {
         staraOcena.AngazovanjeProfesora = ocena.AngazovanjeProfesora;
         staraOcena.DostupnostMaterijala = ocena.DostupnostMaterijala;
         staraOcena.LaboratorijskeVezbe = ocena.LaboratorijskeVezbe;
         staraOcena.PrakticnoZnanje = ocena.PrakticnoZnanje;
         staraOcena.TezinaPredmeta = ocena.TezinaPredmeta;

         Context.Ocene.Update(staraOcena);
         await Context.SaveChangesAsync();
         return Ok(staraOcena);
     }
     else
     {
        return BadRequest("Ne postoji takva ocena");
     }


   }
   

}