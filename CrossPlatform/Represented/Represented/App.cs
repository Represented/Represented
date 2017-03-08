using Plugin.Geolocator;
using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Represented
{
    public class App : Application
    {
        Label enterZipcodePrompt = new Label();
        Entry enterZipcodeEntry = new Entry();
        Button allowLocServices = new Button();
        Button submitZipcode = new Button();
        ContentPage welcomePage = new ContentPage();
        ContentPage feedPage = new ContentPage();
        WebView webView = new WebView();
        String urlString = "http://138.197.9.140/";
        bool locationStored = false;

        public App()
        {
            // initializing view elements    
            allowLocServices = new Button{Text="Tap Here to Allow Location Services"};
            submitZipcode = new Button{Text="Enter"};
            enterZipcodeEntry = new Entry{Keyboard=Keyboard.Numeric};
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

            if (!locationStored) MainPage = new NavigationPage(welcomePage);
        }

        async void onButtonClicked(object sender, EventArgs e)
        {

            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 50;
            var position = await locator.GetPositionAsync(timeoutMilliseconds: 10000);

            Button button = (Button)sender;

            feedPage = buildWebPage(urlString + "@" + position.Latitude + "," + position.Longitude);
            await button.Navigation.PushAsync(feedPage);
        }

        async void onEditorCompleted(object sender, EventArgs e)
        {
            String arg = enterZipcodeEntry.Text;
            if (arg == null || arg.Length != 5) return;

            Button button = (Button)sender;

            feedPage = buildWebPage(urlString + arg);
            await button.Navigation.PushAsync(feedPage);
        }

        ContentPage buildWebPage(String url)
        {
            webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = url,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };

            ContentPage webPage = new ContentPage
            {
                Title = "Represented",
                Content = new StackLayout
                {
                    VerticalOptions = LayoutOptions.Center,
                    Children =
                    {
                        new Label
                        {
                            Text = url,
                            HorizontalTextAlignment = TextAlignment.Center
                        }
                    // webView
                    }
                }
            };

            return webPage;
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
