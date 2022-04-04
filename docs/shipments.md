# Temporary Shipments
1. [Chemical Temp Shipment](http://chemstore.azurewebsites.net/api/management/chemical-temp-shipment/)
   1. [Chemical Merge](http://chemstore.azurewebsites.net/api/management/chemical-temp-shipment/merge/)
2. [Glassware Temp Shipment](http://chemstore.azurewebsites.net/api/management/glassware-temp-shipment/)
   1. [Glassware Merge](http://chemstore.azurewebsites.net/api/management/glassware-temp-shipment/merge/)
3. [Instrument Temp Shipment](http://chemstore.azurewebsites.net/api/management/instrument-temp-shipment/)
    1. [Instrument Merge](http://chemstore.azurewebsites.net/api/management/instrument-temp-shipment/merge/)
    
## **Shipments**

URL: [List of Shipments](https://chemstore.azurewebsites.net/api/management/shipments/?type=chemical)

Params: <type>: <chemical/glassware/instrument>

Method: GET

Response:
```json
   [
    {
        "id": 1,
        "date_time": "2022-03-15T05:15:34.664172Z",
        "chemicals": [
            {
                "CAS_RN": "7647-01-0",
                "name": "Hydrochloric acid",
                "molecular_formula": "HCl",
                "molecular_weight": 36.46094,
                "purity": "60%",
                "manufacturer": "BD Chem",
                "supplier": "Daraz",
                "state": "LIQUID",
                "old_total": 25.2,
                "added_quantity": 12.5
            }
        ]
    },
    {
        "id": 2,
        "date_time": "2022-03-19T09:37:12.121313Z",
        "chemicals": [
            {
                "CAS_RN": "7647-01-0",
                "name": "Hydrochloric acid",
                "molecular_formula": "HCl",
                "molecular_weight": 36.46094,
                "purity": "60%",
                "manufacturer": "BD Chem",
                "supplier": "Daraz",
                "state": "LIQUID",
                "old_total": 54.4,
                "added_quantity": 25.2
            }
        ]
    }
]
```