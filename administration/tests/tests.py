from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase

from administration.models import Chemical
from core.utils import molar_mass

User = get_user_model()


class FuzzySearchTestCase(TestCase):
    def setUp(self):
        User.objects.create(email='aaa@chemstore.com', password="hahaha")

    def test_animals_can_speak(self):
        """Animals that can speak are correctly identified"""
        user = User.objects.get(email='aaa@chemstore.com')
        self.assertEqual(user.password, 'hahaha')

    def test_hello_world(self):
        """Mock test"""
        self.assertEqual("Ha", "Ha")


class ChemicalTestCase(APITestCase):

    def setUp(self) -> None:
        pass

    def resolve_url(self, name, args=None):
        if args is None:
            return reverse(name)
        else:
            return reverse(name, args)

    def test_chemical_create(self):
        response = self.client.post(
            self.resolve_url('chemical-list'),
            {
                'CAS_RN': '26181-88-4',
                'name': 'Benzene',
                'molecular_formula': 'C6H6',
                'purity': "50",
                'manufacturer': 'Honeywell',
                'supplier': 'Honeywell',
                'state': 'LIQUID',
                'quantity': 100
            },
            format='json'
        )

        self.assertEqual(Chemical.objects.count(), 1)

        response = self.client.post(
            self.resolve_url('chemical-list'),
            {
                'CAS_RN': '7647-01-0',
                'name': 'Hydrochloric acid',
                'molecular_formula': 'HCl',
                'purity': "50",
                'manufacturer': 'Honeywell',
                'supplier': 'Honeywell',
                'state': 'LIQUID',
                'quantity': 100
            },
            format='json'
        )
        self.assertEqual(Chemical.objects.count(), 2)
        self.assertEqual(Chemical.objects.get(id=2).molecular_weight, molar_mass('HCl'))
