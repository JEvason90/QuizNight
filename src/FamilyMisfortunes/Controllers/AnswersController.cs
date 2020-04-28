using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FamilyMisfortunes.Models;

namespace FamilyMisfortunes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnswersController : ControllerBase
    {

        private readonly ILogger<AnswersController> _logger;

        public AnswersController(ILogger<AnswersController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Answer> Get()
        {
            var answers = new List<Answer>();

            var answer = new Answer(){
                Score = 350,
                Phrase = "Holding Phrase"
            };

            answers.Add(answer);

            return answers;
        }
    }
}
