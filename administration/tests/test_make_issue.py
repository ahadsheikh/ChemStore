from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from administration.models import Chemical, Glassware, Instrument, StoreConsumer, StoreIssue


class MakeIssueTestCase(APITestCase):
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
        StoreConsumer.objects.create(
            name='Consumer 1',
            consumer_type='PERSONAL',
            room_number='1',
            building_name='Building 1',
        )

    def setUp(self) -> None:
        """
        Set up data for each test
        """
        self.url = reverse('make_issue')
        consumer_id = StoreConsumer.objects.all()[0].id
        self.data = {
            "issue_date": "2022-3-28",
            "carrier_name": "Someone name",
            "note": "This is a nice Issue",
            "consumer_id": consumer_id,
            "objects": [
                {
                    "id": 1,
                    "material_type": "CHEMICAL",
                    "quantity": 90
                },
                {
                    "id": 2,
                    "material_type": "CHEMICAL",
                    "quantity": 90
                },
                {
                    "id": 1,
                    "material_type": "GLASSWARE",
                    "quantity": 40
                },
                {
                    "id": 1,
                    "material_type": "INSTRUMENT",
                    "quantity": 5
                }
            ]
        }

    def test_make_issue(self):
        """
        Test the make_issue view
        """
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        issues = StoreIssue.objects.all()
        self.assertEqual(len(issues), 1)
        self.assertEqual(issues[0].store_consumer.id, self.data['consumer_id'])
        self.assertEqual(issues[0].note, "This is a nice Issue")
        self.assertEqual(issues[0].carrier_name, "Someone name")
        self.assertEqual(str(issues[0].issue_date), "2022-03-28")

        self.assertEqual(Chemical.objects.get(id=1).quantity, 10.0)
        self.assertEqual(Chemical.objects.get(id=2).quantity, 0)

        self.assertEqual(Glassware.objects.get(id=1).quantity, 10)

        self.assertEqual(Instrument.objects.get(id=1).quantity, 5)

    def test_make_issue_without_note_and_c_name(self):
        """
        Test the make_issue view
        """
        del self.data['note']
        del self.data['carrier_name']
        response = self.client.post(self.url, self.data, format='json')
        issues = StoreIssue.objects.all()
        self.assertEqual(issues[0].note, "No Note")
        self.assertEqual(issues[0].carrier_name, "Unknown")

    def test_make_issue_with_wrong_consumer_id(self):
        """
        Test the make_issue view
        """
        self.data['consumer_id'] = 2
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(StoreIssue.objects.all().count(), 0)
        self.assertEqual(len(response.data['errors']), 1)
        self.assertEqual(response.data['errors'][0], 'Consumer not found')

    def test_make_issue_with_wrong_material_id(self):
        """
        Test the make_issue view
        """
        self.data['objects'].append({
            'id': 3,
            'material_type': 'CHEMICAL',
            'quantity': 90
        })
        self.data['objects'].append({
            'id': 4,
            'material_type': 'CHEMICAL',
            'quantity': 90
        })
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(StoreIssue.objects.all().count(), 0)
        self.assertEqual(len(response.data['errors']), 1)
        self.assertEqual(response.data['errors'][0], 'Some material is not found.')

    def test_make_issue_with_wrong_material_type(self):
        """
        Test the make_issue view
        """
        self.data['objects'][0]['material_type'] = "WRONG"
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(StoreIssue.objects.all().count(), 0)
        self.assertEqual(len(response.data['errors']), 1)
        self.assertEqual(response.data['errors'][0], 'Some material type is invalid. Valid type is '
                                                     'CHEMICAL/GLASSWARE/INSTRUMENT.')

    def test_make_issue_with_not_enough_material(self):
        """
        Test the make_issue view
        """
        self.data['objects'][0]['quantity'] = 110
        self.data['objects'][2]['quantity'] = 60
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(StoreIssue.objects.all().count(), 0)
        self.assertEqual(len(response.data['errors']), 1)
        chem = Chemical.objects.get(id=self.data['objects'][0]['id'])
        self.assertEqual(response.data['errors'][0], f'{chem.name} is not enough.')
