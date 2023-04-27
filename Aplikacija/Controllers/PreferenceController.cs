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


}
