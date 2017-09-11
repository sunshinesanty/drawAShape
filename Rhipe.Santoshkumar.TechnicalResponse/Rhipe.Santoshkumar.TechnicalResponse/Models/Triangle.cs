using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NUnit.Framework;

namespace TechnicalResponse.Models
{
    public enum TriangleType
    {
        Acute = 1,
        Obtuse = 2,
        RightAngle = 3,
        Equilateral = 4,
        Invalid = 0
    }

    public class Triangle : TriangleRequestType
    {
        public Triangle(int xUnit, int yUnit, int zUnit)
        {
            this.XUnit = xUnit;
            this.YUnit = yUnit;
            this.ZUnit = zUnit;
        }
        public Triangle(TriangleRequestType requestedTriagnleData)
        {
            this.XUnit = requestedTriagnleData.XUnit;
            this.YUnit = requestedTriagnleData.YUnit;
            this.ZUnit = requestedTriagnleData.ZUnit;
        }
        public TriangleType Type
        {
            get { return this.DetermineType(); }
        }

        /// <summary>
        /// Determines the type of triangle, based on the sides property supplied
        /// </summary>
        /// <returns></returns>
        private TriangleType DetermineType()
        {
            List<int> values = new List<int> { this.XUnit, this.YUnit, this.ZUnit };
            // the function only tests for positive values and negative data is not included,
            // since visual layer ploting will have to convert it to positive cordinats to show output
            if (values.Count < 3 || values.Any(side => side <= 0))
                return TriangleType.Invalid;
            int DistinctSide = values.Distinct().Count();            
            switch (DistinctSide)
            {
                case 1:
                    return TriangleType.Equilateral;
                default:
                    int LongestSide = values.OrderByDescending(side => side).First();
                    int YAxis = values.OrderByDescending(side => side).ElementAt(1);
                    int XAxis = values.OrderByDescending(side => side).ElementAt(2);
                    if (Math.Pow(XAxis, 2) + Math.Pow(YAxis, 2) == Math.Pow(LongestSide, 2)) // Pythagorean theorem
                        return TriangleType.RightAngle;
                    else if (Math.Pow(this.XUnit, 2) + Math.Pow(this.YUnit, 2) < Math.Pow(this.ZUnit, 2)) // Pythagorean theorem
                        return TriangleType.Obtuse;
                    else
                        return TriangleType.Acute;
            }
        }
    }
}