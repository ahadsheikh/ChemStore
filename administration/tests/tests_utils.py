from django.test import TestCase
from core.utils import *

# class UtilityTest(TestCase):
#     @classmethod
#     def setUpTestData(cls):
#         print("setUpTestData: Run once to set up non-modified data for all class methods.")
#         pass
#
#     def setUp(self):
#         print("setUp: Run once for every test method to setup clean data.")
#         pass
#
#     def test_false_is_false(self):
#         print("Method: test_false_is_false.")
#         self.assertFalse(False)
#
#     def test_false_is_true(self):
#         print("Method: test_false_is_true.")
#         self.assertTrue(True)
#
#     def test_one_plus_one_equals_two(self):
#         print("Method: test_one_plus_one_equals_two.")
#         self.assertEqual(1 + 1, 2)


class UtilityTest(TestCase):

    def setUp(self):
        self.compounds = [
            ("CH3COOH", 60.052),
            ("HCl", 36.458),
            ("H2SO4", 98.072),
            ("NH3", 17.031),
            ("HNO3", 63.012),
            ("H3PO4", 97.994),
            ("Na3PO4", 119.976),
            ("CaCO3", 100.086),
            ("(NH4)2SO4", 132.134)
        ]

    def test_is_bracket_safe(self):
        """
        Check is a compound is bracket safe
        """
        for com, _ in self.compounds:
            print(f"Compound Name: {com}")
            self.assertTrue(is_bracket_safe(com))

    def test_is_safe_compound_name(self):
        """
        Test validity of a compound name
        """
        for com, _ in self.compounds:
            print(f"Compound Name: {com}")
            self.assertTrue(is_safe_compound_name(com))

    def test_molar_mass(self):
        """
        Test molar mass of a compound
        """
        for com, mass in self.compounds:
            print(f"{com} : {mass}")
            print(molar_mass(com))
            self.assertGreaterEqual(0.01, molar_mass(com)-mass)