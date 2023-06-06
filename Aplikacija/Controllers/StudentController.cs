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

    [HttpPut("preference")]
    public async Task<ActionResult> DodajPreference([FromBody] Preference[] preference) {
      var userId = authService.GetUserId(Request);
      if(userId == -1) {
        return BadRequest("Invalid token!");
      }
      var korisnik = Context.Studenti.Find(userId);
      if(korisnik == null) {
        return BadRequest("Nepostojeci korisnik!");
      }
      if(korisnik.Preference == null){
        korisnik.Preference = new List<Preference>();
      }
      foreach(Preference pref in preference) {
        var tag = Context.Tagovi.Find(pref.Tag.Id);
        var preferenca = new Preference(tag!, pref.Ocena);
        preferenca.Student = korisnik;
        Context.Preference.Add(preferenca);
        if(tag.Preference == null){
          tag.Preference = new List<Preference>();
        }
        tag.Preference.Add(preferenca);
        Context.SaveChanges();
      }
      Context.Studenti.Update(korisnik);
      await Context.SaveChangesAsync();
      return Ok();
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
        return Ok(await Context.Studenti!
        .Include(s => s.Kalendar)
        .Include(s => s.Modul)
        .Include(s => s.Preference)
        .ToListAsync());
    
   }
   catch(Exception e)
   {
    return BadRequest(e.Message);
   }
   }
   [HttpGet]
   public async Task<ActionResult> vratiStudenta(){
    try {
      var id = authService.GetUserId(Request);
      if(id == -1) {
        return BadRequest("Invalid token");
      }
      var student = await Context.Studenti.Where((student) => student.Id == id)
        .Include((student) => student.Preference)
        .ThenInclude(p => p.Tag)
        .Include((student) => student.Modul)
        .FirstOrDefaultAsync();
      if(student == null) {
        return NotFound("Student ne postoji");
      }
      return Ok(new {
        username = student.Username,
        id = student.Id,
        modul = student.Modul,
        semestar = student.Semestar,
        email = student.Email,
        perm = student.Privilegije,
        preference = student.Preference
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
        stariStudent.Literatura=student.Literatura;

        Context.Studenti.Update(stariStudent);
        await Context.SaveChangesAsync();
        return Ok(stariStudent);
     }
     else
     {
      return BadRequest("ne postoji takav student");
     }

  }
  [HttpPut("azurirajStudentovuBiografiju/{idstudenta}/{bio}")]
   public async Task<ActionResult> azurirajStudentovuBiografiju(int idstudenta,string bio)
  {
     var stariStudent = await Context.Studenti.FindAsync(idstudenta);

     if(stariStudent != null)
     {
        stariStudent.Bio = bio;
      

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