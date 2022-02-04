# Add Shipment
**Link:** [Add Shipment](http://chemstore.azurewebsites.net/api/management/add-shipment/) 

**Body:**
```json
{
    "shipment_date": "2022-2-4",
    "note": "This is a great shipment",
    "chemical": {
        "old": [
            {
                "id": 1,
                "amount": 1.0
            },
            {
                "id": 2,
                "amount": 3.0
            }
        ],
        "new": [
            {
                "CAS_RN": "64-17-5",
                "name": "Ethanol",
                "molecular_formula": "C2H6O",
                "purity": "60%",
                "manufacturer": "BD Chemicals",
                "supplier": "Gen Supply",
                "state": "LIQUID",
                "amount": 5.0
            }
        ]
    },
    "glassware":{
        "old": [
            {
                "id": 1,
                "amount": 3
            },
            {
                "id": 2,
                "amount": 4
            }
        ],
        "new": [
            {
                "name": "Janina Tube",
                "manufacturer": "BD Cemicals",
                "supplier": "Daraz",
                "size": "25ml",
                "material_type": "Glass",
                "quantity": 3
            }
        ]
    },
    "instrument": {
        "old": [
            {
                "id": 1,
                "amount": 1
            },
            {
                "id": 2,
                "amount": 10
            }
        ],
        "new": [
            {
                "name": "Machine 3",
                "manufacturer": "BD",
                "supplier": "Bd1",
                "quantity": 7
            }
        ]
    }
}
```

**Response:**
```json
{
    "message": "Shipment Added",
    "partial_update": false,
    "errors": {},
    "shipment": {
        "id": 7,
        "shipment_date": "2022-02-04",
        "note": "This is a great shipment"
    }
}
```

