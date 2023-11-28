using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAccess.Models
{
    public class Grade
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int StartingMarks { get; set; }
        public int EndingMarks { get; set; }
        public virtual Course Course { get; set; }
    }
}