from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


class FuzzySearchTestCase(TestCase):
    def setUp(self):
        User.objects.create(email='aaa@chemstore.com', password="hahaha")

    def test_animals_can_speak(self):
        """Animals that can speak are correctly identified"""
        user = User.objects.get(email='aaa@chemstore.com')
        self.assertEqual(user.password, 'hahaha')
        print("Hahah")

    def test_hello_world(self):
        """Mock test"""
        self.assertEqual("Ha", "Ha")
