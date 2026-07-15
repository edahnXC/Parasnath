using System.ComponentModel.DataAnnotations;

namespace ParasnathAPI.Models
{
    public class SiteSetting
    {
        [Key]
        public required string Key { get; set; }
        public required string Value { get; set; }
    }
}
