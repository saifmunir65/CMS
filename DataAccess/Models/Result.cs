using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAccess.Models
{
    public class Result
    {
        public int Id { get; set; }
        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }
        public virtual Subject Subject { get; set; }
        public int ObtainedMarks { get; set; }
        public virtual Grade Grade { get; set; }
    }
}