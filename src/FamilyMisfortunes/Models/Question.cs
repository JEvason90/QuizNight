using System;
using System.Collections.Generic;

namespace FamilyMisfortunes.Models
{
    public class Question
    {
        public int QuestionId {get;set;}
        public string QuestionText {get;set;}
        public ICollection<Answer> Answers {get;set;}

    }
}
