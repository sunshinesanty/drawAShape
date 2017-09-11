using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using TechnicalResponse.Models;
using TechnicalResponse.Classes;

namespace Triangle.Test
{
    [TestFixture]
    public class TriangleTests
    {
        /// <summary>
        /// Tests to chcek if the data output is correct
        /// </summary>
        [Test]
        public void Test_DetermineTriangleType()
        {
            Assert.AreEqual(TriangleType.Equilateral, new TestWebApi.Models.Triangle(4, 4, 4).Type, "Values 4, 4, 4 Failed");
            Assert.AreEqual(TriangleType.RightAngle, new TestWebApi.Models.Triangle(5, 4, 3).Type, "Values 5, 4, 3 Failed");
            Assert.AreEqual(TriangleType.RightAngle, new TestWebApi.Models.Triangle(3, 4, 5).Type, "Values 3, 4, 5 Failed");
            Assert.AreEqual(TriangleType.RightAngle, new TestWebApi.Models.Triangle(4, 5, 3).Type, "Values 4, 5, 3 Failed");
            Assert.AreEqual(TriangleType.Acute, new TestWebApi.Models.Triangle(4, 3, 2).Type, "Values 4, 3, 2 Failed");
            Assert.AreEqual(TriangleType.Acute, new TestWebApi.Models.Triangle(4, 2, 3).Type, "Values 4, 2, 3 Failed");
            Assert.AreEqual(TriangleType.Acute, new TestWebApi.Models.Triangle(3, 4, 2).Type, "Values 3, 4, 2 Failed");
            Assert.AreEqual(TriangleType.Obtuse, new TestWebApi.Models.Triangle(4, 3, 7).Type, "Values 4, 3, 7 Failed");
            Assert.AreEqual(TriangleType.Obtuse, new TestWebApi.Models.Triangle(4, 7, 9).Type, "Values 4, 7, 3 Failed");
            Assert.AreEqual(TriangleType.Obtuse, new TestWebApi.Models.Triangle(3, 4, 7).Type, "Values 3, 4, 7 Failed");
            Assert.AreEqual(TriangleType.Invalid, new TestWebApi.Models.Triangle(-4, 4, 4).Type, "Values -4, 4, 4 Failed");
            Assert.AreEqual(TriangleType.Invalid, new TestWebApi.Models.Triangle(4, -4, 4).Type, "Values 4, -4, 4 Failed");
            Assert.AreEqual(TriangleType.Invalid, new TestWebApi.Models.Triangle(4, 4, -4).Type, "Values 4, 4, -4 Failed");
        }
    }
}
