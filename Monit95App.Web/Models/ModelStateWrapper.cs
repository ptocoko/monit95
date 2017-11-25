namespace Monit95App.Models
{
    using System.Web.Http.ModelBinding;

    using Monit95App.Services.Validations;

    public class ModelStateWrapper : IValidationDictionary
    {
        private ModelStateDictionary ModelStateDictionary { get; } = new ModelStateDictionary();        

        #region IValidationDictionary Members

        public void AddError(string key, string errorMessage)
        {
            ModelStateDictionary.AddModelError(key, errorMessage);
        }

        public bool IsValid
        {
            get { return this.ModelStateDictionary.IsValid; }
        }

        #endregion
    }
}
