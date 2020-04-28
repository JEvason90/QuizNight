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
    public class QuestionAndAnswersController : ControllerBase
    {

        private readonly ILogger<QuestionAndAnswersController> _logger;

        public QuestionAndAnswersController(ILogger<QuestionAndAnswersController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public QuestionAndAnswers Get()
        {
            var response = new QuestionAndAnswers();
        
            response.Question = "Name a country with a HDI greater than 0.7, but less than 0.8";
            
            var answer = new Answer(){
                Id = 1,
                Score = 350,
                Phrase = "Holding Phrase"
            };

            response.Id = 1;
            response.Answers = new List<Answer>();
            response.Answers.Add(answer);

            return response;
        }
    }
}
