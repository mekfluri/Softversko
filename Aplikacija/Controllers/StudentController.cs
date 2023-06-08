using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/student")]

public class StudentController : ControllerBase
{

    public IzaberryMeDbContext Context { get; set; }
    private AuthService authService { get; set; }

    public StudentController(IzaberryMeDbContext context, AuthService authService)
    {
        Context = context;
        this.authService = authService;
    }

    [HttpPut("preference")]
    public async Task<ActionResult> DodajPreference([FromBody] Preference[] preference)
    {
        var userId = authService.GetUserId(Request);
        if (userId == -1)
        {
            return BadRequest("Invalid token!");
        }
        var korisnik = Context.Studenti.Find(userId);
        if (korisnik == null)
        {
            return BadRequest("Nepostojeci korisnik!");
        }
        if (korisnik.Preference == null)
        {
            korisnik.Preference = new List<Preference>();
        }
        foreach (Preference pref in preference)
        {
            var tag = Context.Tagovi.Find(pref.Tag.Id);
            var preferenca = new Preference(tag!, pref.Ocena);
            preferenca.Student = korisnik;
            Context.Preference.Add(preferenca);
            if (tag.Preference == null)
            {
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
            return Ok("Dodali smo studenta sa id-jem" + student.Id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("vratiStudente")]
    public async Task<ActionResult> vratiStudente()
    {
        try
        {
            return Ok(await Context.Studenti!
            .Include(s => s.Kalendar)
            .Include(s => s.Modul)
            .Include(s => s.Preference)
            .ToListAsync());

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(int id) {
      try {
        var student = Context.Studenti.Where(s => s.Id == id)
        .Include(s => s.Preference)
        .ThenInclude(p => p.Tag)
        .Include(s => s.Modul)
        .First();
        if(student == null){
          return NotFound("Student nije pronadjen!");
        }
        return Ok(new {
          id = student.Id,
          username = student.Username,
          bio = student.Bio,
          email = student.Email,
          modul = student.Modul,
          preference = student.Preference,
          semestar = student.Semestar
        });
      }
      catch(Exception ex){
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }
    [HttpGet]
    public async Task<ActionResult> vratiStudenta()
    {
        try
        {
            var id = authService.GetUserId(Request);
            if (id == -1)
            {
                return BadRequest("Invalid token");
            }
            var student = await Context.Studenti.Where((student) => student.Id == id)
              .Include((student) => student.Preference)
              .ThenInclude(p => p.Tag)
              .Include((student) => student.Modul)
              .FirstOrDefaultAsync();
            if (student == null)
            {
                return NotFound("Student ne postoji");
            }
            return Ok(new
            {
                username = student.Username,
                id = student.Id,
                modul = student.Modul,
                semestar = student.Semestar,
                email = student.Email,
                perm = student.Privilegije,
                preference = student.Preference
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("obrisiStudenta/{id}")]
    public async Task<ActionResult> obrisiStudenta(int id)
    {

        var p = await Context.Studenti!.FindAsync(id);


        if (p != null)
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

    [HttpPut("azurirajStudenta/{username}/{idstudenta}")]
    public async Task<ActionResult> azurirajStudenta(string username, int idstudenta)
    {
        var stariStudent = await Context.Studenti.FindAsync(idstudenta);

        if (stariStudent != null)
        {
            stariStudent.Username = username;

            Context.Studenti.Update(stariStudent);
            await Context.SaveChangesAsync();
            return Ok(stariStudent);
        }
        else
        {
            return BadRequest("ne postoji takav student");
        }

    }
    [HttpPut("azurirajSemestarStudenta/{semestar}/{idstudenta}")]
    public async Task<ActionResult> azurirajSemestarStudenta(int semestar, int idstudenta)
    {
        var stariStudent = await Context.Studenti.FindAsync(idstudenta);

        if (stariStudent != null)
        {
            stariStudent.Semestar = semestar;

            Context.Studenti.Update(stariStudent);
            await Context.SaveChangesAsync();
            return Ok(stariStudent);
        }
        else
        {
            return BadRequest("ne postoji takav student");
        }

    }

    [HttpPut("azurirajBioStudenta/{bio}/{idstudenta}")]
    public async Task<ActionResult> azurirajBioStudenta(string bio, int idstudenta)
    {
        var stariStudent = await Context.Studenti.FindAsync(idstudenta);

        if (stariStudent != null)
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


    [HttpPut("azurirajStudentovuBiografiju/{idstudenta}/{bio}")]
    public async Task<ActionResult> azurirajStudentovuBiografiju(int idstudenta, string bio)
    {
        var stariStudent = await Context.Studenti.FindAsync(idstudenta);

        if (stariStudent != null)
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


    [HttpPut("azurirajModulStudenta/{nazivModula}/{idstudenta}")]
    public async Task<ActionResult> azurirajModulStudenta(string nazivModula, int idstudenta)
    {
        var stariStudent = await Context.Studenti
       .Include(p => p.Modul)
       .Where(p => p.Id == idstudenta)
       .FirstOrDefaultAsync();

        var noviModul = await Context.Moduli.Where(p => p.Naziv == nazivModula).FirstAsync();

        if (stariStudent != null)
        {
            stariStudent.Modul = noviModul;

            Context.Studenti.Update(stariStudent);
            await Context.SaveChangesAsync();
            return Ok(stariStudent);
        }
        else
        {
            return BadRequest("ne postoji takav student");
        }

    }

  [HttpPut("azurirajURLStudenta/{url}/{idstudenta}")]
   public async Task<ActionResult> azurirajURLStudenta(string url, int idstudenta)
  {
     var stariStudent = await Context.Studenti
    .Include(p => p.Modul)
    .Where(p => p.Id == idstudenta)
    .FirstOrDefaultAsync();

    

     if(stariStudent != null)
     {
        stariStudent.ProfileImageUrl = url;
      
        Context.Studenti.Update(stariStudent);
        await Context.SaveChangesAsync();
        return Ok(stariStudent);
     }
     else
     {
      return BadRequest("ne postoji takav student");
     }

  }


  [HttpGet("vratiSliku/{idstudenta}")]
   public async Task<ActionResult> vratiSliku(int idstudenta)
  {
     var stariStudent = await Context.Studenti
    .Include(p => p.Modul)
    .Where(p => p.Id == idstudenta)
    .FirstOrDefaultAsync();

    

     if(stariStudent != null)
     {
       
      
        
        return Ok(stariStudent.ProfileImageUrl);
     }
     else
     {
      return BadRequest("ne postoji takav student");
     }

  }
    
    
    [HttpPost("upload"), DisableRequestSizeLimit]
    public IActionResult Upload()
   {
    try
    {
        var file = Request.Form.Files[0];
        var folderName = Path.Combine("Client", "izaberry-client", "src","assets");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        if (file.Length > 0)
        {
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName!.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(folderName, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return Ok(new { dbPath });
        }
        else
        {
            return BadRequest();
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex}");
    }
  }
}