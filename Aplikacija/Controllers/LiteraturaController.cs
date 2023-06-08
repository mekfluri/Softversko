using System.Text.Json;
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

    [AllowAnonymous]
    [HttpGet("vratiPoslednjuDodatu")]
    public async Task<ActionResult> vratiPoslednjuDodatu()
    {
        try
        {
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var poslednjaDodataLiteratura = await Context.Literature
                .OrderByDescending(l => l.Id)
                .Include(l => l.Student)
                .Include(l => l.Predmet)
                .FirstOrDefaultAsync();

            if (poslednjaDodataLiteratura == null)
            {
                return NotFound();
            }

            var jsonString = JsonSerializer.Serialize(poslednjaDodataLiteratura, options);
            return Content(jsonString, "application/json");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }



    [HttpPost("dodajLiteraturu/{studentID}/{predmetID}")]
    public async Task<ActionResult> dodajLiteraturu(string filePath, int studentID, int predmetID)
    {
        Literatura literatura = new Literatura();
        Student student = await Context.Studenti.Where(x => x.Id == studentID).FirstOrDefaultAsync();
        Predmet predmet = await Context.Predmeti.Where(x => x.Id == predmetID).FirstOrDefaultAsync();
        if (student == null || predmet == null)
            return BadRequest("");
        literatura.filePath = filePath;
        literatura.Student = student;
        literatura.Predmet = predmet;


        try
        {
            Context.Literature.Add(literatura);
            await Context.SaveChangesAsync();
            return Ok(literatura);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("obrisiLiteraturu/{idliteratura}")]
    public async Task<ActionResult> obrisiLiteraturu(int idliteratura)
    {
        var k = await Context.Literature.FindAsync(idliteratura);

        if (k != null)
        {
            Context.Literature.Remove(k);
            await Context.SaveChangesAsync();
            return Ok(idliteratura);
        }
        else
        {
            return BadRequest("Ne postoji takva literatura");
        }
    }

    [HttpGet("vartiLiteraturu/{idstudenta}")]
    public async Task<ActionResult> vratiLiteraturu(int idstudenta)
    {
        var kal = await Context.Literature.Where(x => x.Student.Id == idstudenta).Include(x => x.Student).ToListAsync();

        return Ok(kal);

    }

    [HttpGet("vartiLiteraturuPredmeta/{idpredmeta}")]
    public async Task<ActionResult> vratiLiteraturuPredmeta(int idpredmeta)
    {
        var kal = await Context.Literature.Where(x => x.Predmet!.Id == idpredmeta).ToListAsync();

        return Ok(kal);

    }

    [AllowAnonymous]
    [HttpGet("byStudentLit/{id}")]
    public async Task<ActionResult> byStudentLit(int id)
    {
        try
        {
            var student = Context.Studenti.Where(s => s.Id == id).First();
            if (student == null)
            {
                return BadRequest();
            }
            var literatura = await Context.Literature.Where(k => k.Student!.Id == id).ToListAsync();
            return Ok(literatura);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("vratisve")]
    public async Task<ActionResult> vratisve()
    {
        try
        {
            return Ok(await Context.Literature.ToListAsync());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
   
     
}