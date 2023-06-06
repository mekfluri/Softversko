using Microsoft.AspNetCore.Mvc;

namespace Aplikacija.Controllers;

[ApiController]
[Route("/preference")]

public class PreferenceContoroller : ControllerBase{

    public IzaberryMeDbContext Context { get; set; }

    public PreferenceContoroller(IzaberryMeDbContext context)
    {
        Context = context;
    }

    [HttpGet]
    public async Task<ActionResult> AllPreferences() {
        return Ok(await Context.Preference.Include(p => p.Tag).ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePreference(int id){
        var pref = Context.Preference.Find(id);
        Context.Preference.Remove(pref);
        await Context.SaveChangesAsync();
        return Ok();
    }


}
