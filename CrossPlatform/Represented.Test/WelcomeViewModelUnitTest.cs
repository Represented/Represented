using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using Xamarin.Forms;

namespace Represented.Test
{
    [TestClass]
    public class WelcomeViewModelUnitTest
    {

        [TestMethod]
        public void TestGoodURLFormat1()
        {
            ViewModels.WelcomeViewModel.buildContent("zip=53703");
        }

        [TestMethod]
        public void TestGoodURLFormat2()
        {
            ViewModels.WelcomeViewModel.buildContent("lat=53.703,long=-83.099");
        }

        [TestMethod]
        public void TestBadURLFormat1()
        {
            try
            {
                var validZip = ViewModels.WelcomeViewModel.isValidZip("zp=53703");

            }
            catch (Exceptions.URLFormatException e)
            {
            }
        }

        [TestMethod]
        public void TestBadURLFormat2()
        {
            try
            {
                var validZip = ViewModels.WelcomeViewModel.isValidZip("lt=53703,long=-83.099");

            }
            catch (Exceptions.URLFormatException e)
            {
            }
        }

        [TestMethod]
        public void TestBadURLFormat3()
        {
            try
            {
                var validZip = ViewModels.WelcomeViewModel.isValidZip("lat=53703,lng=-83.099");

            }
            catch (Exceptions.URLFormatException e)
            {
            }
        }

        [TestMethod]
        public void TestValidZip()
        {
            var validZip = ViewModels.WelcomeViewModel.isValidZip("53703");
            Assert.IsTrue(validZip, "Expected valid zip code."); ;
        }

        [TestMethod]
        public void TestInvalidZip1()
        {
            var validZip = ViewModels.WelcomeViewModel.isValidZip("537.3");
            Assert.IsFalse(validZip, "Expected invalid zip code."); ;
        }

        [TestMethod]
        public void TestInvalidZip2()
        {
            var validZip = ViewModels.WelcomeViewModel.isValidZip("537033");
            Assert.IsFalse(validZip, "Expected invalid zip code."); ;
        }

        [TestMethod]
        public void TestInvalidZip3()
        {
            var validZip = ViewModels.WelcomeViewModel.isValidZip("5370");
            Assert.IsFalse(validZip, "Expected invalid zip code."); ;
        }

        [TestMethod]
        public void TestGoodMainPage1()
        {
            Model.RepresentedItem item = new Model.RepresentedItem();
            item.Zip = "53703";
            item.Lat = 0.0;
            item.Long = 0.0;

            List<Model.RepresentedItem> items = new List<Model.RepresentedItem>();
            items.Add(item);

            ContentPage welcomePage = new ContentPage();


            ViewModels.WelcomeViewModel.setMainPage(items, welcomePage);
        }

        [TestMethod]
        public void TestGoodMainPage2()
        {
            Model.RepresentedItem item = new Model.RepresentedItem();
            item.Zip = "";
            item.Lat = 43.123;
            item.Long = -84.990;

            List<Model.RepresentedItem> items = new List<Model.RepresentedItem>();
            items.Add(item);

            ContentPage welcomePage = new ContentPage();


            ViewModels.WelcomeViewModel.setMainPage(items, welcomePage);
        }

        [TestMethod]
        public void TestBadMainPage1()
        {
            List<Model.RepresentedItem> items = null;
            ContentPage welcomePage = null;
            try
            {
                ViewModels.WelcomeViewModel.setMainPage(items, welcomePage);
            }
            catch (Exceptions.PageCreationException e)
            {

            }
        }

        [TestMethod]
        public void TestBadMainPage2()
        {
            List<Model.RepresentedItem> items = null;
            ContentPage welcomePage = new ContentPage();
            try
            {
                ViewModels.WelcomeViewModel.setMainPage(items, welcomePage);
            }
            catch (Exceptions.PageCreationException e)
            {

            }
        }

        [TestMethod]
        public void TestBadMainPage3()
        {
            Model.RepresentedItem item = new Model.RepresentedItem();
            item.Zip = "";
            item.Lat = 43.123;
            item.Long = -84.990;

            List<Model.RepresentedItem> items = new List<Model.RepresentedItem>();
            items.Add(item);

            ContentPage welcomePage = null;
            try
            {
                ViewModels.WelcomeViewModel.setMainPage(items, welcomePage);
            }
            catch (Exceptions.PageCreationException e)
            {

            }
        }
    }
}
