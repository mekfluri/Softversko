using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]

[Route("/literatura")]
public class LiteraturaController : ControllerBase
{
    public IzaberryMeDbContext Context { get; set; }

    public LiteraturaController(IzaberryMeDbContext context)
    {
        Context = context;
    }

     
    [HttpPost("dodajLiteraturu")]
    public async Task<ActionResult> dodajLiteraturu([FromBody] Literatura literatura)
    {
         try
        {
          Context.Literature.Add(literatura);
          await Context.SaveChangesAsync();
          return Ok("Dodali smo literatura sa id-jem"+literatura.Id);
        }
        catch(Exception e)
        {
          return BadRequest(e.Message);
        }
   }

   [HttpDelete("obrisiLiteraturu/{idliteratura}")]
   public async Task<ActionResult> obrisiKalendar(int idliteratura)
   {
       var k = await Context.Kalendari.FindAsync(idliteratura);
       
       if(k != null)
       {
         Context.Kalendari.Remove(k);
         await Context.SaveChangesAsync();
         return Ok("Obrisali smo literatura sa rednim brojem" + idliteratura);
       }
       else 
       {
        return BadRequest("Ne postoji takva literatura");
       }
   }
 
   [HttpGet("vartiLiteraturu/{idstudenta}")]
   public async Task<ActionResult> vratiLiteraturu(int idstudenta)
   {
       var kal = await Context.Literature.Include(p=>p.Student)
                                .Where(p=>p.Student.Id == idstudenta)
                                .Include(p=>p.filePath)
                                .Select(p=>new{
                                    p.Id,
                                    p.filePath
                                }).ToListAsync();

       return Ok(kal);
                                
   }

    [AllowAnonymous]
    [HttpGet("byStudentLit/{id}")]
    public async Task<ActionResult> byStudentLit(int id){
        try {
            var student = Context.Studenti.Where(s => s.Id == id).First();
            if(student == null){
                return BadRequest();
            }
            var literatura = await Context.Literature.Where(k => k.Student!.Id == id).ToListAsync();
            return Ok(literatura);
        }
        catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }


}