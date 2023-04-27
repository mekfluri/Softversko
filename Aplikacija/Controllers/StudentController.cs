using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/student")]

public class StudentContoroller : ControllerBase{

    public IzaberryMeDbContext Context { get; set; }

    public StudentContoroller(IzaberryMeDbContext context)
    {
        Context = context;
    }

    [HttpPost("DodajStudenta")]
   public async Task<ActionResult> dodajStudenta([FromBody] Student student)
   {
    try
    {
        Context.Studenti!.Add(student);
        await Context.SaveChangesAsync();
        return Ok("Dodali smo studenta sa id-jem"+student.Id);
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
   }

   [HttpGet("vratiStudente")]
   public async Task<ActionResult> vratiStudente()
   {
    try{
        return Ok(await Context.Studenti!.ToListAsync());
    
   }
   catch(Exception e)
   {
    return BadRequest(e.Message);
   }
   }

  [HttpDelete("obrisiStudenta/{id}")]
   public async Task<ActionResult> obrisiStudenta(int id)
   {
       
        var p = await Context.Studenti!.FindAsync(id);
        
       
      if(p!= null)
      {
         Context.Studenti.Remove(p);
         await Context.SaveChangesAsync();
         return Ok("Obrisali smo studenta sa rednim brojem" + id);
      }
      else
      {
        return BadRequest("ne postoji trazeni predmet");
      }
      
   }

   [HttpPut("azurirajStudenta/{idstudenta}")]
   public async Task<ActionResult> azurirajStudenta([FromBody]Student student, int idstudenta)
  {
     var stariStudent = await Context.Studenti.FindAsync(idstudenta);

     if(stariStudent != null)
     {
        stariStudent.Username = student.Username;
        stariStudent.Password = student.Password;
        stariStudent.Email = student.Email;
        stariStudent.Kalendar = student.Kalendar;
        stariStudent.Komentari = student.Komentari;
        stariStudent.Modul = student.Modul;
        stariStudent.Preference = student.Preference;
        stariStudent.Privilegije = student.Privilegije;
        stariStudent.Salt = student.Salt;
        stariStudent.Semestar = student.Semestar;

        Context.Studenti.Update(stariStudent);
        await Context.SaveChangesAsync();
        return Ok(stariStudent);
     }
     else
     {
      return BadRequest("ne postoji takav student");
     }

  }

  

 

  



}