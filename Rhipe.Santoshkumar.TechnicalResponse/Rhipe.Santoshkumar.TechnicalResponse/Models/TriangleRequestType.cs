using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalResponse.Models
{
    public class ShapeRequestType
    {
        public string RequestString { get; set; }

        /// <summary>
        ///  Tokenizes text into an array of words, using whitespace and
        ///  all punctuation as delimiters.
        /// </summary>
        public string[] TokenizeRequest
        {
            get
            {
                char[] delimiters = new char[] {
                      '{', '}', '(', ')', '[', ']', '>','<','-', '_', '=', '+',
                      '|', '\\', ':', ';', ' ', '\'', ',', '.', '/', '?', '~', '!',
                      '@', '#', '$', '%', '^', '&', '*', ' ', '\r', '\n', '\t'
                  };

                return this.RequestString.Split(delimiters, StringSplitOptions.RemoveEmptyEntries);
            }
        }
    }
}