using System.ComponentModel.DataAnnotations;

public abstract class Person
{
    [Required]
    [StringLength(25)]
    public string Surname { get; set; }

    [Required]
    [StringLength(25)]
    public string Name { get; set; }

    [Required]
    [StringLength(25)]
    public string SecondName { get; set; }
}
