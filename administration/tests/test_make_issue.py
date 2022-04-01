from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from administration.models import Chemical, Glassware, Instrument, StoreConsumer, StoreIssue, IssueCart


class IssueCartTestCase(APITestCase):
    """
    Test the make_issue view
    """
    @classmethod
    def setUpTestData(cls):
        """
        Set up data for the whole TestCase (only run once for the TestCase)
        """
        Chemical.objects.create(
            CAS_RN='26181-88-4',
            name='Benzene',
            molecular_formula='C6H6',
            molecular_weight='78.1134',
            purity="50",
            manufacturer='Honeywell',
            supplier='Honeywell',
            state='LIQUID',
            quantity=100,
        )
        Chemical.objects.create(
            CAS_RN="7647-01-0",
            name='Hydrochloric acid',
            molecular_formula='HCl',
            molecular_weight='35.45',
            purity="30",
            manufacturer='Honeywell',
            supplier='Honeywell',
            state='LIQUID',
            quantity=90,
        )
        Glassware.objects.create(
            name='Beaker',
            manufacturer='Honeywell',
            supplier='Honeywell',
            size='10',
            material_type='GLASS',
            quantity=50,
        )
        Instrument.objects.create(
            name='Machine 1',
            manufacturer='Honeywell',
            supplier='Honeywell',
            quantity=10,
        )
        Instrument.objects.create(
            name='Machine 2',
            manufacturer='Honeywell',
            supplier='Honeywell',
            quantity=10,
        )

    def setUp(self) -> None:
        """
        Set up data for each test
        """
        self.url = reverse('issue_cart-list')
        self.detail_url = reverse('issue_cart-detail', args=[1])

    def test_issue_cart_create(self):
        """
        Test the issue-cart
        """
        response = self.client.post(
            self.url,
            {
                'object_id': 1,
                'object_type': 'CHEMICAL',
                'quantity': 1,
            }
            , format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['object_id'], 1)
        self.assertEqual(response.data['object_type'], 'CHEMICAL')
        self.assertEqual(response.data['quantity'], 1)
        self.assertEqual(IssueCart.objects.count(), 1)

        response = self.client.post(
            self.url,
            {
                'object_id': 1,
                'object_type': 'GLASSWARE',
                'quantity': 5,
            }
            , format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['object_id'], 1)
        self.assertEqual(response.data['object_type'], 'GLASSWARE')
        self.assertEqual(response.data['quantity'], 5)
        self.assertEqual(IssueCart.objects.count(), 2)

        response = self.client.post(
            self.url,
            {
                'object_id': 1,
                'object_type': 'INSTRUMENT',
                'quantity': 5,
            }
            , format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['object_id'], 1)
        self.assertEqual(response.data['object_type'], 'INSTRUMENT')
        self.assertEqual(response.data['quantity'], 5)
        self.assertEqual(IssueCart.objects.count(), 3)

    def test_issue_cart_create_with_wrong_id(self):
        """
        Test the issue-cart with wrong id
        """
        response = self.client.post(
            self.url,
            {
                'object_id': 3,
                'object_type': 'CHEMICAL',
                'quantity': 1,
            }
            , format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(IssueCart.objects.count(), 0)

    def test_issue_cart_create_with_wrong_type(self):
        """
        Test the issue-cart with wrong type
        """
        response = self.client.post(
            self.url,
            {
                'object_id': 3,
                'object_type': 'WRONG',
                'quantity': 1,
            }
            , format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(IssueCart.objects.count(), 0)

    def test_issue_cart_create_with_wrong_quantity(self):
        """
        Test the issue-cart with wrong quantity
        """
        response = self.client.post(
            self.url,
            {
                'object_id': 3,
                'object_type': 'CHEMICAL',
                'quantity': -10,
            }
            , format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(IssueCart.objects.count(), 0)

        response = self.client.post(
            self.url,
            {
                'object_id': 3,
                'object_type': 'CHEMICAL',
                'quantity': 0,
            }
            , format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(IssueCart.objects.count(), 0)
