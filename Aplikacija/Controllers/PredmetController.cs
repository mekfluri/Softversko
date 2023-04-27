using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]

[Route("/predmet")]
public class PredmetController : ControllerBase{

    public IzaberryMeDbContext Context { get; set; }

    public PredmetController(IzaberryMeDbContext context)
    {
        Context = context;
    }

   [HttpPost("DodajPredmet")]
   public async Task<ActionResult> dodajPredmet([FromBody] Predmet predmet)
   {
    try
    {
        Context.Predmeti!.Add(predmet);
        await Context.SaveChangesAsync();
        return Ok("Dodali smo predmet sa id-jem"+predmet.Id);
    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
   }

   [HttpGet("vratiPredmet")]
   public async Task<ActionResult> vratiPredmet()
   {
    try{
        return Ok(await Context.Predmeti!.ToListAsync());
    
   }
   catch(Exception e)
   {
    return BadRequest(e.Message);
   }
   }

   [HttpDelete("obrisiPredmet/{id}")]
   public async Task<ActionResult> obrisiPredmet(int id)
   {
       
        var p = await Context.Predmeti!.FindAsync(id);
       
       if(p!= null)
       {
        Context.Predmeti.Remove(p);
         await Context.SaveChangesAsync();
         return Ok("Obrisali smo premet sa rednim brojem" + id);
       }
       else
       {
        return BadRequest("ne postoji trazeni predmet");
       }
      
   }

  
   [HttpGet("pretraziPoNazivu/{naziv}")]
   public async Task<ActionResult> PretraziPoNazivu(string naziv)
   {
       
        var p = await Context.Predmeti.Where(s=> s.Naziv == naziv).ToListAsync();
        
        if(p != null)
        {
           return Ok(p);
        }
        else
        {
           return BadRequest("Ne postoji predmet sa odredjenim nazivom");
        }

   }

   [HttpGet("pretrazi/{modul}/{semestar}")]
   public async Task<ActionResult> Pretrazi(int modul, int semestar)
   {
        var p = await Context.Predmeti.Where(s=> s.Modul == modul && s.Semestar == semestar).ToListAsync();
        
        if(p != null)
        {
           return Ok(p);
        }
        else
        {
           return BadRequest("Ne postoje takvi predmeti");
        }
   }

   [HttpPut("azurirajOpis/{opis}/{idpredmeta}")]
    public async Task<ActionResult>  AzurirajOpis(string opis, int idpredmeta)
    {
       var novipredmet = await Context.Predmeti.FindAsync(idpredmeta);

       if(novipredmet != null)
       {
           novipredmet.Opis = opis;
           Context.Predmeti.Update(novipredmet);
           await Context.SaveChangesAsync();
           return Ok(novipredmet);

       }
       else
       {
            return BadRequest("Ne postoji odrenjeni predmet");
       }




    }

    [HttpPut("azurirajPredmet/{idpredmeta}")]
    public async Task<ActionResult> azurirajPredmet([FromBody] Predmet predmet,int  idpredmeta)
    {
        var stariPredmet = await Context.Predmeti!.FindAsync(idpredmeta);
       
        

        if(stariPredmet != null)
        {

            stariPredmet.Naziv = predmet.Naziv;
            stariPredmet.Modul = predmet.Modul;
            stariPredmet.Opis = predmet.Opis;
            stariPredmet.Semestar = predmet.Semestar;
            stariPredmet.Tagovi = predmet.Tagovi;
            stariPredmet.ESPB = predmet.ESPB;
            stariPredmet.Ocene = predmet.Ocene;
            

            Context.Predmeti!.Update(stariPredmet);
            await Context.SaveChangesAsync();
            return Ok("promenili smo stadion" + stariPredmet);
        }
        else 
        {
            return BadRequest("Ne postoji trazeni predmet");
        }
       

    }

    [HttpGet("ocenaPredmeta/{idpredmeta}")]
    public async Task<ActionResult> ocenaPredmeta(int idpredmeta)
    {
       
          var ocene = await Context.Predmeti.Where(p=> p.Id == idpredmeta)
                                      .Include(p=> p.Ocene)
                                      .Select(p=>new{
                                        p.Ocene
                                      }).ToListAsync();
                                  
         return Ok(ocene); 
        
    }

    [HttpGet("vratiKomentare/{idpredmeta}")]
    public async Task<ActionResult> vratiKomentare(int idpredmeta)
    {
        var komentari = await Context.Komentari.Include(p=>p.Predmet)
                                        .Where(p=>p.Predmet.Id == idpredmeta)
                                        .Select(p=>new{
                                            p.Id,
                                            p.Text
                                        }).ToListAsync();

        return Ok(komentari);
    }





    
      
}





