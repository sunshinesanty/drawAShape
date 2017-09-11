using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnicalResponse.Classes
{
    public static class Helper
    {
        /// <summary>
        /// Retrieve a formatted string for consistent error response messages
        /// </summary>
        /// <param name="message">ex.Message</param>
        /// <param name="correlationId">NDC id</param>
        /// <returns></returns>
        public static string HttpResponseErrorMessage(string message, string correlationId)
        {
            return string.Format("Message: {0}; NDC: {1}", message, correlationId);
        }
        public static string HttpResponseErrorMessage(Exception ex, string correlationId)
        {
            return HttpResponseErrorMessage(ex.Message, correlationId);
        }        
    }
}