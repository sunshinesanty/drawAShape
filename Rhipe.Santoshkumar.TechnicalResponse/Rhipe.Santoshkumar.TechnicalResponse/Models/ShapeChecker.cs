using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalResponse.Models
{
    public class ShapeChecker
    {
        private List<string> _tokenisedString = new List<string>();

        public ShapeChecker(string[] TokenizedString) {
            this._tokenisedString = TokenizedString.ToList();
        }


    }
}