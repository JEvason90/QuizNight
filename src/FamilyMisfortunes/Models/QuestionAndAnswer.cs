using System;
using System.Collections.Generic;

namespace FamilyMisfortunes.Models
{
    public class QuestionAndAnswers
    {
        public int Id {get;set;}
        public string Question {get;set;}
        public List<Answer> Answers {get;set;}

    }
}
