using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Models
{
    public class Contact
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Name is required")]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [RegularExpression(".+\\@.+\\..+", ErrorMessage = "Enter valid Email")]
        public string Email { get; set; }
        [Required(ErrorMessage ="Number is required")]
        [RegularExpression("^[0-9]*$", ErrorMessage ="Enter valid number")]
        public long Mobile { get; set; }
        [RegularExpression("^[0-9]*$", ErrorMessage ="Enter valid number")]
        public int? Landline { get; set; }
        [Required(ErrorMessage ="Website is required")]
        [Url]
        public string Website { get; set; }
        public string Address { get; set; }
        
    }
}