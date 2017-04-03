using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace Represented.Test
{
    [TestClass]
    public class UnitTest1
    {
        List<Represented.Model.RepresentedItem> db_DOC;
        Represented.Model.RepresentedItem repItem;

        public Represented.App setUp()
        {
            db_DOC = new List<Represented.Model.RepresentedItem>();
            repItem = new Represented.Model.RepresentedItem();
            return new Represented.App();
        }

        public void tearDown()
        {
            db_DOC.Clear();
            repItem = null;
        }

        [TestMethod]
        public void TestURLFormat(string url)
        {
            var app = setUp();
            app.buildContent(url);
            tearDown();
            app = null;
        }

        [TestMethod]
        public void TestZipValid(string zip)
        {
            var app = setUp();
            app.isValidZip(zip);
            tearDown();
            app = null;
        }
    }
}
