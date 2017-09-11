using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TechnicalResponse
{
    public static class WebApiConfig
    {
        public static string GetAllowedOrigins()
        {
            System.Collections.Generic.List<string> allowedOrgs = new System.Collections.Generic.List<string>();
            allowedOrgs.Add(System.Configuration.ConfigurationManager.AppSettings.Get("AllowedOrigins"));
            return string.Join(",", allowedOrgs.Where(org => !string.IsNullOrEmpty(org)).ToArray());
        }

        public static string GetAllowedShapes()
        {
            System.Collections.Generic.List<string> allowedShapes = new System.Collections.Generic.List<string>();
            allowedShapes.Add(System.Configuration.ConfigurationManager.AppSettings.Get("AllowedShapes"));
            return string.Join(",", allowedShapes.Where(org => !string.IsNullOrEmpty(org)).ToArray());
        }

        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            string allowedOrgs = WebApiConfig.GetAllowedOrigins();
            if (!string.IsNullOrWhiteSpace(allowedOrgs))
            {
                var cors = new EnableCorsAttribute(
                   allowedOrgs, "*", "POST,GET");
                cors.ExposedHeaders.Add("Content");
                cors.ExposedHeaders.Add("Origin");
                config.EnableCors(cors);
            }
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
