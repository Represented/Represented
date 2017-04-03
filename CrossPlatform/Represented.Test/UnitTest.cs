using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace Represented.Test
{
    [TestClass]
    public class UnitTest
    {

        [TestMethod]
        public void TestURLFormat()
        {
            Represented.ViewModels.WelcomeViewModel.buildContent("zip=53703");
        }

        [TestMethod]
        public void TestZipValid()
        {
            Represented.ViewModels.WelcomeViewModel.isValidZip("53703");
        }
    }
}
