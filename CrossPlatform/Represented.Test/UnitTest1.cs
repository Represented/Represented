using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace Represented.Test
{
    [TestClass]
    public class UnitTest1
    {
        List<Represented.Model.RepresentedItem> db_DOC;
        Represented.Model.RepresentedItem repItem = new Represented.Model.RepresentedItem();

        public Represented.App setUp()
        {
            db_DOC = new List<Represented.Model.RepresentedItem>();
            return new Represented.App();
        }

        public void tearDown()
        {
            db_DOC.Clear();
        }

        [TestMethod]
        public void TestPutZip(string zip)
        {
            var app = setUp();
            app.checkStoredLocation();
            tearDown();
        }
    }
}
