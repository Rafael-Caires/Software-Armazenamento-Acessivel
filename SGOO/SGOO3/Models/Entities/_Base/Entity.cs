using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SGOO3.Models.Entities._Base
{
    public class Entity
    {
        [Key]
        public int id { get; set; }
        [ScaffoldColumn(false)]
        public string createdBy { get; set; }
        [ScaffoldColumn(false)]
        public string modifiedBy { get; set; }
        [ScaffoldColumn(false)]
        public DateTime createdDate { get; set; }
        [ScaffoldColumn(false)]
        public DateTime? modifiedDate { get; set; }
    }
}
