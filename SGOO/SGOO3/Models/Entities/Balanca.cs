using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SGOO3.Models.Entities
{
    public class Balanca : _Base.Entity
    {

        [Display(Name = "Int balança")]
        public int BalancaId { get; set; }

        [Display(Name = "Boll se está sendo usada")]
        public bool Usada { get; set; }

        public ICollection<Produto> Produtos { get; set; }
        [NotMapped]
        public ICollection<Balanca> Balancas { get; set; }

    }
}
