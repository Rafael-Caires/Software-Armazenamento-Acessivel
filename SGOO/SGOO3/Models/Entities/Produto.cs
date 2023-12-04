using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SGOO3.Models.Entities
{
    public class Produto : _Base.Entity
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [Display(Name = "Nome")]
        public string Nome { get; set; }

        [Display(Name = "Quantidade Mínima")]
        public int QuantidadeMinima { get; set; }

        [Display(Name = "Peso Atual")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PesoAtual { get; set; }

        [Display(Name = "Em Falta")]
        public bool EmFalta { get; set; }

        [Display(Name = "ID da Balança")]
        [ForeignKey("BalancaId")]
        public int BalancaId { get; set; }

        public Balanca Balanca { get; set; }
        [NotMapped]
        public ICollection<Produto> Produtos { get; set; }
    }

}
