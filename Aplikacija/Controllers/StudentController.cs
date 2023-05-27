using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/student")]

public class StudentController : ControllerBase{

    public IzaberryMeDbContext Context { get; set; }
    private AuthService authService { get; set; }

    public StudentController(IzaberryMeDbContext context, AuthService authService)
    {
        Context = context;
        this.authService = authService;
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
   [HttpGet]
   public async Task<ActionResult> vratiStudenta(){
    try {
      var authHeader = Request.Headers["Authorization"].ToString();
      if(string.IsNullOrEmpty(authHeader)){
        return BadRequest("No token provided");
      }
      var token = authHeader.Substring(7);
      var id = authService.GetUserId(token);
      var student = await Context.Studenti.Where((student) => student.Id == id)
        .Include((student) => student.Preference)
        .FirstOrDefaultAsync();
      if(student == null) {
        return NotFound("Student ne postoji");
      }
      return Ok(new {
        username = student.Username,
        id = student.Id,
        modul = student.Modul,
        semestar = student.Semestar,
        email = student.Email
      });
    }catch(Exception ex){
      return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
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