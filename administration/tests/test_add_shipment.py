from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from administration.models import ChemicalTempShipment, Chemical, Glassware, \
    Instrument, GlasswareTempShipment, InstrumentTempShipment, ChemicalShipment, \
    Shipment, GlasswareShipment, InstrumentShipment
from core.utils import molar_mass

User = get_user_model()


class ChemicalTempShipmentTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        Chemical.objects.create(
            name='test_chemical', CAS_RN='123456789', molecular_formula='C2H4O2', molecular_weight=molar_mass('C2H4O2'),
            purity='60.00', manufacturer='pct', supplier='pct', state='LIQUID', quantity=100
        )
        Chemical.objects.create(
            name='test_chemical2', CAS_RN='223456789', molecular_formula='C6H6', molecular_weight=molar_mass('C6H6'),
            purity='60.00', manufacturer='pct', supplier='pct', state='LIQUID', quantity=90
        )

    def setUp(self) -> None:
        self.url = reverse('chemical_temp_shipment-list')
        self.url_detail = reverse('chemical_temp_shipment-detail', args=[1])
        self.url_merge = reverse('chemical_temp_shipment-merge')
        self.user = User.objects.create(
            email='test@chemstore.com'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_chemical_temp_shipment_create(self):
        response = self.client.post(self.url, {
            'chemical': Chemical.objects.get(name='test_chemical').id,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ChemicalTempShipment.objects.count(), 1)

    def test_chemical_temp_shipment_create_with_invalid_chemical(self):
        response = self.client.post(self.url, {
            'chemical': 12,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ChemicalTempShipment.objects.count(), 0)
        self.assertIn('chemical', response.data)

    def test_chemical_temp_shipment_create_with_invalid_quantity(self):
        response = self.client.post(self.url, {
            'chemical': Chemical.objects.get(name='test_chemical').id,
            'quantity': -110
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ChemicalTempShipment.objects.count(), 0)

        response = self.client.post(self.url, {
            'chemical': Chemical.objects.get(name='test_chemical').id,
            'quantity': 0
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ChemicalTempShipment.objects.count(), 0)

    def test_chemical_temp_shipment_update_quantity(self):
        chem = Chemical.objects.get(name='test_chemical')
        ChemicalTempShipment.objects.create(
            chemical=chem, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'chemical': chem.id,
            'quantity': 20
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ChemicalTempShipment.objects.get(id=1).quantity, 20)
        self.assertEqual(response.data['quantity'], 20)

    def test_chemical_temp_shipment_update_quantity_with_invalid_data(self):
        chem = Chemical.objects.get(name='test_chemical')
        ChemicalTempShipment.objects.create(
            chemical=chem, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'chemical': chem.id,
            'quantity': -110
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(self.url_detail, {
            'chemical': chem.id,
            'quantity': 0
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_chemical_temp_shipment_update_chemical(self):
        chem = Chemical.objects.get(name='test_chemical')
        chem2 = Chemical.objects.get(name='test_chemical2')
        ChemicalTempShipment.objects.create(
            chemical=chem, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'chemical': chem2.id,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['chemical'], 2)

    def test_chemical_temp_shipment_update_chemical_with_invalid_data(self):
        chem = Chemical.objects.get(name='test_chemical')
        ChemicalTempShipment.objects.create(
            chemical=chem, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'chemical': 3,
            'quantity': 20
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('chemical', response.data)

    def test_chemical_temp_shipment_get(self):
        chem = Chemical.objects.get(name='test_chemical')
        ChemicalTempShipment.objects.create(
            chemical=chem, quantity=10
        )
        response = self.client.get(self.url_detail, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['chemical']['id'], chem.id)
        self.assertEqual(response.data['chemical']['quantity'], chem.quantity)
        self.assertEqual(response.data['quantity'], 10)

    def test_chemical_temp_shipment_delete(self):
        chem = Chemical.objects.get(name='test_chemical')
        ChemicalTempShipment.objects.create(
            chemical=chem, quantity=10
        )
        response = self.client.delete(self.url_detail, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ChemicalTempShipment.objects.count(), 0)

    def test_chemical_temp_shipment_merge(self):
        chem = Chemical.objects.get(name='test_chemical')
        chem2 = Chemical.objects.get(name='test_chemical2')
        ChemicalTempShipment.objects.create(
            chemical=chem, quantity=10
        )
        ChemicalTempShipment.objects.create(
            chemical=chem2, quantity=10
        )
        response = self.client.post(self.url_merge, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Shipment.objects.all().count(), 1)
        self.assertEqual(ChemicalShipment.objects.all().count(), 2)
        self.assertEqual(Chemical.objects.get(name='test_chemical').quantity, chem.quantity + 10)
        self.assertEqual(Chemical.objects.get(name='test_chemical2').quantity, chem2.quantity + 10)
        self.assertEqual(ChemicalTempShipment.objects.count(), 0)


class GlasswareTempShipmentTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        Glassware.objects.create(
            name='test_glassware', manufacturer='pct', supplier='pct',
            size='30', material_type='Glass', quantity=50
        )
        Glassware.objects.create(
            name='test_glassware2', manufacturer='pct', supplier='pct',
            size='30', material_type='Glass', quantity=30
        )

    def setUp(self) -> None:
        self.url = reverse('glassware_temp_shipment-list')
        self.url_detail = reverse('glassware_temp_shipment-detail', args=[1])
        self.url_merge = reverse('glassware_temp_shipment-merge')
        self.user = User.objects.create(
            email='test@chemstore.com'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_glassware_temp_shipment_create(self):
        response = self.client.post(self.url, {
            'glassware': Glassware.objects.get(name='test_glassware').id,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GlasswareTempShipment.objects.count(), 1)

    def test_glassware_temp_shipment_create_with_invalid_glassware(self):
        response = self.client.post(self.url, {
            'glassware': 12,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(GlasswareTempShipment.objects.count(), 0)
        self.assertIn('glassware', response.data)

    def test_glassware_temp_shipment_create_with_invalid_quantity(self):
        response = self.client.post(self.url, {
            'glassware': Glassware.objects.get(name='test_glassware').id,
            'quantity': -110
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(GlasswareTempShipment.objects.count(), 0)

        response = self.client.post(self.url, {
            'glassware': Glassware.objects.get(name='test_glassware').id,
            'quantity': 0
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(GlasswareTempShipment.objects.count(), 0)

    def test_glassware_temp_shipment_update_quantity(self):
        glassware = Glassware.objects.get(name='test_glassware')
        GlasswareTempShipment.objects.create(
            glassware=glassware, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'glassware': glassware.id,
            'quantity': 20
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(GlasswareTempShipment.objects.get(id=1).quantity, 20)
        self.assertEqual(response.data['quantity'], 20)

    def test_glassware_temp_shipment_update_quantity_with_invalid_data(self):
        glassware = Glassware.objects.get(name='test_glassware')
        GlasswareTempShipment.objects.create(
            glassware=glassware, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'glassware': glassware.id,
            'quantity': -110
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(self.url_detail, {
            'glassware': glassware.id,
            'quantity': 0
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_glassware_temp_shipment_update_glassware(self):
        glassware = Glassware.objects.get(name='test_glassware')
        glassware2 = Glassware.objects.get(name='test_glassware2')
        GlasswareTempShipment.objects.create(
            glassware=glassware, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'glassware': glassware2.id,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['glassware'], 2)

    def test_glassware_temp_shipment_update_glassware_with_invalid_data(self):
        glassware = Glassware.objects.get(name='test_glassware')
        GlasswareTempShipment.objects.create(
            glassware=glassware, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'glassware': 3,
            'quantity': 20
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('glassware', response.data)

    def test_glassware_temp_shipment_get(self):
        glassware = Glassware.objects.get(name='test_glassware')
        GlasswareTempShipment.objects.create(
            glassware=glassware, quantity=10
        )
        response = self.client.get(self.url_detail, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['glassware']['id'], glassware.id)
        self.assertEqual(response.data['glassware']['quantity'], glassware.quantity)
        self.assertEqual(response.data['quantity'], 10)

    def test_glassware_temp_shipment_delete(self):
        glassware = Glassware.objects.get(name='test_glassware')
        GlasswareTempShipment.objects.create(
            glassware=glassware, quantity=10
        )
        response = self.client.delete(self.url_detail, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(GlasswareTempShipment.objects.count(), 0)

    def test_glassware_temp_shipment_merge(self):
        glassware = Glassware.objects.get(name='test_glassware')
        glassware2 = Glassware.objects.get(name='test_glassware2')
        GlasswareTempShipment.objects.create(
            glassware=glassware, quantity=10
        )
        GlasswareTempShipment.objects.create(
            glassware=glassware2, quantity=10
        )
        response = self.client.post(self.url_merge, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Shipment.objects.all().count(), 1)
        self.assertEqual(GlasswareShipment.objects.all().count(), 2)
        self.assertEqual(Glassware.objects.get(name='test_glassware').quantity, glassware.quantity + 10)
        self.assertEqual(Glassware.objects.get(name='test_glassware2').quantity, glassware2.quantity + 10)
        self.assertEqual(GlasswareTempShipment.objects.count(), 0)


class InstrumentTempShipmentTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        Instrument.objects.create(
            name='test_instrument', manufacturer='pct', supplier='pct', quantity=50
        )
        Instrument.objects.create(
            name='test_instrument2', manufacturer='pct', supplier='pct', quantity=30
        )

    def setUp(self) -> None:
        self.url = reverse('instrument_temp_shipment-list')
        self.url_detail = reverse('instrument_temp_shipment-detail', args=[1])
        self.url_merge = reverse('instrument_temp_shipment-merge')
        self.user = User.objects.create(
            email='test@chemstore.com'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_instrument_temp_shipment_create(self):
        response = self.client.post(self.url, {
            'instrument': Instrument.objects.get(name='test_instrument').id,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(InstrumentTempShipment.objects.count(), 1)

    def test_instrument_temp_shipment_create_with_invalid_instrument(self):
        response = self.client.post(self.url, {
            'instrument': 12,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(InstrumentTempShipment.objects.count(), 0)
        self.assertIn('instrument', response.data)

    def test_instrument_temp_shipment_create_with_invalid_quantity(self):
        response = self.client.post(self.url, {
            'instrument': Instrument.objects.get(name='test_instrument').id,
            'quantity': 110
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(InstrumentTempShipment.objects.count(), 1)

    def test_instrument_temp_shipment_update_quantity(self):
        instrument = Instrument.objects.get(name='test_instrument')
        InstrumentTempShipment.objects.create(
            instrument=instrument, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'instrument': instrument.id,
            'quantity': 20
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(InstrumentTempShipment.objects.get(id=1).quantity, 20)
        self.assertEqual(response.data['quantity'], 20)

    def test_instrument_temp_shipment_update_quantity_with_invalid_data(self):
        instrument = Instrument.objects.get(name='test_instrument')
        InstrumentTempShipment.objects.create(
            instrument=instrument, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'instrument': instrument.id,
            'quantity': -110
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.put(self.url_detail, {
            'instrument': 3,
            'quantity': 0
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('instrument', response.data)

    def test_instrument_temp_shipment_update_instrument(self):
        instrument = Instrument.objects.get(name='test_instrument')
        instrument2 = Instrument.objects.get(name='test_instrument2')

        InstrumentTempShipment.objects.create(
            instrument=instrument, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'instrument': instrument2.id,
            'quantity': 20
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['instrument'], 2)

    def test_instrument_temp_shipment_update_instrument_with_invalid_data(self):
        instrument = Instrument.objects.get(name='test_instrument')
        InstrumentTempShipment.objects.create(
            instrument=instrument, quantity=10
        )
        response = self.client.put(self.url_detail, {
            'instrument': 3,
            'quantity': 10
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('instrument', response.data)

    def test_instrument_temp_shipment_get(self):
        instrument = Instrument.objects.get(name='test_instrument')
        InstrumentTempShipment.objects.create(
            instrument=instrument, quantity=10
        )
        response = self.client.get(self.url_detail, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['instrument']['id'], instrument.id)
        self.assertEqual(response.data['instrument']['quantity'], instrument.quantity)
        self.assertEqual(response.data['quantity'], 10)

    def test_instrument_temp_shipment_delete(self):
        instrument = Instrument.objects.get(name='test_instrument')
        InstrumentTempShipment.objects.create(
            instrument=instrument, quantity=10
        )
        response = self.client.delete(self.url_detail, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(InstrumentTempShipment.objects.count(), 0)

    def test_instrument_temp_shipment_merge(self):
        instrument = Instrument.objects.get(name='test_instrument')
        instrument2 = Instrument.objects.get(name='test_instrument2')
        InstrumentTempShipment.objects.create(
            instrument=instrument, quantity=10
        )
        InstrumentTempShipment.objects.create(
            instrument=instrument2, quantity=10
        )
        response = self.client.post(self.url_merge, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Shipment.objects.all().count(), 1)
        self.assertEqual(InstrumentShipment.objects.all().count(), 2)
        self.assertEqual(Instrument.objects.get(name='test_instrument').quantity, instrument.quantity + 10)
        self.assertEqual(Instrument.objects.get(name='test_instrument2').quantity, instrument2.quantity + 10)
        self.assertEqual(InstrumentTempShipment.objects.count(), 0)


class ShipmentTestCase(APITestCase):

    def setUp(self) -> None:
        self.chem1 = Chemical.objects.create(
            name='test_chemical', CAS_RN='123456789', molecular_formula='C2H4O2', molecular_weight=molar_mass('C2H4O2'),
            purity='60.00', manufacturer='pct', supplier='pct', state='LIQUID', quantity=100
        )
        self.chem2 = Chemical.objects.create(
            name='test_chemical2', CAS_RN='223456789', molecular_formula='C6H6', molecular_weight=molar_mass('C6H6'),
            purity='60.00', manufacturer='pct', supplier='pct', state='LIQUID', quantity=90
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
        self.instru2 = Instrument.objects.create(
            name='Machine 2',
            manufacturer='Honeywell',
            supplier='Honeywell',
            quantity=10,
        )

        self.user = User.objects.create(
            email='test@chemstore.com'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_shipments(self):
        ChemicalTempShipment.objects.create(
            chemical=self.chem1,
            quantity=10
        )
        GlasswareTempShipment.objects.create(
            glassware=self.glass,
            quantity=10
        )
        InstrumentTempShipment.objects.create(
            instrument=self.instru,
            quantity=10
        )
        self.client.post(reverse('chemical_temp_shipment-merge'))
        self.client.post(reverse('glassware_temp_shipment-merge'))
        self.client.post(reverse('instrument_temp_shipment-merge'))

        response = self.client.get(reverse('shipments') + '?type=chemical')
