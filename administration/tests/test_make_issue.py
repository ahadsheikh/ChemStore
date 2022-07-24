from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from administration.models import Chemical, Glassware, Instrument, StoreConsumer, IssueCart, IssueObject, Issue
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


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
        self.user = User.objects.create(
            email='test@chemstore.com'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

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

    def test_issue_cart_merge(self):
        """
        Testing merge all issue cart
        """
        store_con = StoreConsumer.objects.create(
            name="Lab 1",
            consumer_type="PHYSICAL",
            room_number="1",
            building_name="Building 1",
        )

        IssueCart.objects.create(
            object_id=1,
            object_type="CHEMICAL",
            quantity=50,
        )

        IssueCart.objects.create(
            object_id=1,
            object_type="GLASSWARE",
            quantity=30,
        )

        IssueCart.objects.create(
            object_id=1,
            object_type="INSTRUMENT",
            quantity=5,
        )

        url = reverse('issue_cart-merge', args=[store_con.id])
        response = self.client.post(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['success'], 'Issue cart merged successfully')
        self.assertEqual(IssueCart.objects.count(), 0)

        chem = Chemical.objects.get(id=1)
        glass = Glassware.objects.get(id=1)
        inst = Instrument.objects.get(id=1)

        self.assertEqual(chem.quantity, 50)
        self.assertEqual(glass.quantity, 20)
        self.assertEqual(inst.quantity, 5)


class IssueTestCase(APITestCase):

    def setUp(self) -> None:
        self.chem = Chemical.objects.create(
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
        self.glass = Glassware.objects.create(
            name='Beaker',
            manufacturer='Honeywell',
            supplier='Honeywell',
            size='10',
            material_type='GLASS',
            quantity=50,
        )
        self.instru = Instrument.objects.create(
            name='Machine 1',
            manufacturer='Honeywell',
            supplier='Honeywell',
            quantity=10,
        )

        self.user = User.objects.create(
            email='test@chemstore.com'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_issuses(self):
        IssueCart.objects.create(
            object_id=self.chem.id,
            object_type='CHEMICAL',
            quantity=10
        )
        IssueCart.objects.create(
            object_id=self.glass.id,
            object_type='GLASSWARE',
            quantity=10
        )
        IssueCart.objects.create(
            object_id=self.instru.id,
            object_type='INSTRUMENT',
            quantity=10
        )
        StoreConsumer.objects.create(
            name="Lab 1",
            consumer_type="PHYSICAL",
            room_number="110",
            building_name="Chem Build"
        )
        self.client.post('/api/management/issue-cart/1/merge/', format='json')
        response = self.client.get('/api/management/issues/1/', format='json')
        self.assertEqual(IssueCart.objects.count(), 0)
        self.assertEqual(StoreConsumer.objects.count(), 1)
        self.assertEqual(IssueObject.objects.count(), 3)
        self.assertEqual(Issue.objects.count(), 1)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(len(response.data[0]['objects']), 3)
