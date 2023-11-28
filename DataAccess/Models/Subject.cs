using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAccess.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int CreditHours { get; set; }
        public virtual ICollection<Student> Students { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual Course Course { get; set; }
    }
}