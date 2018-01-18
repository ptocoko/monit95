namespace Monit95App.Services.Rsur.Particip
{    
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;    

    public class ParticipAddDto : IValidatableObject
    {
        #region Required properties

        public string Surname { get; set; }
        public string Name { get; set; }      
        public DateTime Birthday { get; set; }
        public int RsurSubjectName { get; set; }
        public string SchoolId { get; set; }

        #endregion

        public string SecondName { get; set; }
        public int CategoryId { get; set; }
        public int Experience { get; set; }
        public string Phone { get; set; }                        
        public string Email { get; set; } // TODO: validate by MailAdress                       
        public string ClassNumbers { get; set; } // TODO: need custom attribute to avoide repetion class's numbers                      

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var errors = new List<ValidationResult>();
            string errorMessage;

            errorMessage = Validation.Validator.ValidateName(Surname);
            if (errorMessage != null)
                errors.Add(new ValidationResult(errorMessage));

            errorMessage = Validation.Validator.ValidateName(Name);
            if (errorMessage != null)
                errors.Add(new ValidationResult(errorMessage));

            if (string.IsNullOrWhiteSpace(this.Surname))
                errors.Add(new ValidationResult($"{nameof(Surname)} is null or empty"));
            if (string.IsNullOrWhiteSpace(this.Name))
                errors.Add(new ValidationResult($"{nameof(Name)} is null or empty"));


            return errors;
        }
    }
}
