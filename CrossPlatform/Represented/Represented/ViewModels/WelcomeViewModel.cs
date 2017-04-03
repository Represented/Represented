using Plugin.Geolocator;
using Represented.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Represented.ViewModels
{
    public class WelcomeViewModel
    {

        // Accesses local database to check for stored location data
        // If no location data stored, load welcome page
        // If location data stored, load feed page with location specific feed
        public static NavigationPage setMainPage(List<RepresentedItem> items, ContentPage welcomePage)
        {
            var storedZip = "";
            var storedLat = 0.0;
            var storedLong = 0.0;
            // Iterate through database items returned from query
            foreach (RepresentedItem item in items)
            {
                if (item.Zip.Length == 5)
                {
                    storedZip = item.Zip;
                }
                if (item.Lat != 0.0)
                {
                    storedLat = item.Lat;
                }
                if (item.Long != 0.0)
                {
                    storedLong = item.Long;
                }
            }

            if (storedLong != 0.0 && storedLat != 0.0)
            {
                return new NavigationPage(buildContent("lat=" + storedLat + ",long=" + storedLong));
            }
            else if (storedZip.Length == 5)
            {
                return new NavigationPage(buildContent("zip=" + storedZip));
            }
            else
            {
                return new NavigationPage(welcomePage);
            }
        }

        public static bool isValidZip(string argString)
        {

            if (argString == null || argString.Length != 5) return false;
            if (Regex.IsMatch(argString, @"^\d+$") == false) return false;

            return true;
        }

        public static ContentPage buildContent(string argString)
        {
            if (!argString.Substring(0, 4).Equals("zip=") &&
                !argString.Substring(0, 4).Equals("lat="))
            {
                throw new URLFormatException("First URL argument invalid in URL: " + Represented.App.urlString + argString);
            }

            if (!argString.Substring(0, 4).Equals("zip=") &&
                !argString.Contains("long="))
            {
                throw new URLFormatException("Second URL argument invalid in URL: " + Represented.App.urlString + argString);
            }

            // Build WebView with lat and long args
            WebView webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = Represented.App.urlString + argString,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };

            var content = new ContentPage
            {
                Title = "Represented",
                Content = new StackLayout
                {
                    Children = {
                        webView
                    }
                }
            };

            return content;
        }
    }
}
