

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace footbets.App.Controllers;


[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
  [HttpGet]
  public string Index()
  {
    var toto = "{API init}";
    return $"{toto}";
  }
}