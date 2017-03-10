using Plugin.Geolocator;
using Represented.Data;
using Represented.Model;
using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Represented
{
    public class App : Application
    {
        static RepresentedDatabase database;

        Label enterZipcodePrompt = new Label();
        Entry enterZipcodeEntry = new Entry();
        Button allowLocServices = new Button();
        Button submitZipcode = new Button();
        ContentPage welcomePage = new ContentPage();
        ContentPage feedPage = new ContentPage();
        WebView webView = new WebView();

        String urlString = "http://138.197.9.140/";
        bool locationStored = false;
        String zip = "";
        Double lat = 0.0;
        Double lng = 0.0;

        RepresentedItem representedItem = new RepresentedItem();

        static RepresentedDatabase Database
        {
            get
            {
                if (database == null)
                {
                    database = new RepresentedDatabase(DependencyService.Get<IFileHelper>().GetLocalFilePath("RepresentedSQLite.db3"));
                }
                return database;
            }
        }

        public App()
        {
            // initializing view elements    
            allowLocServices = new Button{Text="Tap Here to Allow Location Services"};
            submitZipcode = new Button{Text="Enter"};
            enterZipcodeEntry = new Entry{Keyboard=Keyboard.Numeric};
            enterZipcodeEntry.SetBinding(Entry.TextProperty, "Zip");
            enterZipcodePrompt = new Label {HorizontalTextAlignment=TextAlignment.Center,Text="Or Enter Your Zipcode:"};

            // add event triggers
            submitZipcode.Clicked += onEditorCompleted;
            allowLocServices.Clicked += onButtonClicked;
            
            // welcome page accepts user location info and requests webpage
            var welcomePage = new ContentPage
            {
                Title = "Represented",
                Content = new StackLayout
                {
                    VerticalOptions = LayoutOptions.Center,
                    Children =
                    {
                        allowLocServices,
                        enterZipcodePrompt,
                        enterZipcodeEntry,
                        submitZipcode
                    }
                }
            };

            checkForStoredLocation();

            if (locationStored == true)
            {
                WebView webView = new WebView
                {
                    Source = new UrlWebViewSource
                    {
                        Url = urlString,
                    },
                    VerticalOptions = LayoutOptions.FillAndExpand
                };

                var content = new ContentPage
                {
                    Title = "WebApp",
                    Content = new StackLayout
                    {
                        Children = {
                        webView
                    }
                    }
                };

                MainPage = new NavigationPage(content);
            }
            else MainPage = new NavigationPage(welcomePage);
        }

        async void checkForStoredLocation()
        {
            RepresentedItem repItem = await App.Database.GetItemAsync(1);

            if (repItem != null)
            {
                locationStored = true;
                zip = repItem.Zip;
                lat = repItem.Lat;
                lng = repItem.Long;
            }
            else locationStored = false;
        }

        async void onButtonClicked(object sender, EventArgs e)
        {

            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 50;
            var position = await locator.GetPositionAsync(timeoutMilliseconds: 10000);

            representedItem.ID = 1;
            representedItem.Zip = "";
            representedItem.Lat = position.Latitude;
            representedItem.Long = position.Longitude;

            await App.Database.SaveItemAsync(representedItem);

            Button button = (Button)sender;

            WebView webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = urlString,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };
            
            var content = new ContentPage
            {
                Title = "WebApp",
                Content = new StackLayout
                {
                    Children = {
                        webView
                    }
                }
            };

            await button.Navigation.PushAsync(content);
        }

        async void onEditorCompleted(object sender, EventArgs e)
        {
            String arg = enterZipcodeEntry.Text;
            if (arg == null || arg.Length != 5) return;

            representedItem.ID = 1;
            representedItem.Zip = arg;
            representedItem.Lat = 0;
            representedItem.Long = 0;

            await App.Database.SaveItemAsync(representedItem);

            Button button = (Button)sender;

            WebView webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = urlString,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };
            
            var content = new ContentPage
            {
                Title = "WebApp",
                Content = new StackLayout
                {
                    Children = {
                        webView
                    }
                }
            };
            
            await button.Navigation.PushAsync(content);
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
