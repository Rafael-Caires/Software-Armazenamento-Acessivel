using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SGOO3.Models.Entities
{
    public class Configuracao : _Base.Entity
    {
        [Display(Name = "LED")]
        public bool Led { get; set; }

        [Display(Name = "Áudio")]
        public bool Audio { get; set; }
    }
}
